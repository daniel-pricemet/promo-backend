import {
  Inject,
  Injectable,
  UnauthorizedException,
  CACHE_MANAGER,
} from '@nestjs/common';
import { User } from 'domain/entities/user.entity';
import { LoginDTO } from 'application/DTOs/login.dto';
import { IDataFetcherProvider } from 'domain/contracts/data-fetch-provider.contract';
import { INJECTABLES } from 'shared/injectables';
import { IUsersRepository } from 'domain/contracts/users-repository.contract';
import {
  IDatabaseConnection,
  IDatabaseConnectionFromSSO,
} from 'domain/interfaces/database-connection.interface';
import { Cache } from 'cache-manager';
import { getKnexInstance } from 'infrastructure/database/knex';

@Injectable()
export class AuthService {
  constructor(
    @Inject(INJECTABLES.IDataFetcherProvider)
    private readonly _apiService: IDataFetcherProvider,
    @Inject(INJECTABLES.IUsersRepository)
    private readonly _usersRepository: IUsersRepository,
    @Inject(CACHE_MANAGER)
    private readonly _cache: Cache,
  ) {}

  async validateUser(dto: LoginDTO): Promise<User | null> {
    const userResponse = await this._apiService
      .post(`${process.env.SSO_URL}/sessions`, {
        email: dto.email,
        password: dto.password,
      })
      .catch(() => {
        throw new UnauthorizedException();
      });

    type UserResponse = {
      data: { user: Record<string, string> } & { [key: string]: string };
    };

    const connectionResponse = await this._apiService.post(
      `${process.env.SSO_URL}/globals/conn-all-companies`,
      {
        application_name: process.env.APP_NAME,
        company_id: userResponse.data.user.company.id,
      },
      {
        headers: {
          Authorization: `Bearer ${(userResponse as UserResponse).data.token}`,
        },
      },
    );

    type ConnectionResponse = {
      data: Array<Record<keyof IDatabaseConnectionFromSSO, string>>;
    };

    const [connection] = (connectionResponse as ConnectionResponse).data;

    await this._cache.set<IDatabaseConnection>(
      (userResponse as UserResponse).data.token,
      {
        ...connection,
        database: connection.database_name,
        user: connection.username,
        company_id: userResponse.data.user.company.id as string,
      },
      {
        ttl: 1000 * 60 * 45,
      },
    );

    const dbInstance = await getKnexInstance({
      ...connection,
      database: connection.database_name,
      user: connection.username,
      company_id: userResponse.data.user.company.id as string,
    });

    const user = await dbInstance('users')
      .withSchema('industria')
      .where('email', dto.email)
      .first();

    if (!user) {
      const createdUser = await this._usersRepository.create({
        email: dto.email,
        name: (userResponse as UserResponse).data.user.full_name,
        token: (userResponse as UserResponse).data.token,
        active: 1,
      });

      return {
        ...createdUser,
        token: (userResponse as UserResponse).data.token,
      };
    }

    user.token = (userResponse as UserResponse).data.token;

    await dbInstance('users')
      .withSchema('industria')
      .update({
        token: user.token,
      })
      .where('id', user.id);

    await dbInstance.destroy();

    return {
      ...user,
      token: (userResponse as UserResponse).data.token,
    };
  }
}
