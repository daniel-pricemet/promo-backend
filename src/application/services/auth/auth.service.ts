import {
  Inject,
  Injectable,
  UnauthorizedException,
  CACHE_MANAGER,
} from '@nestjs/common';
import { User, UserCompanyAggregate } from 'domain/entities/user.entity';
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
import { UsersRepository } from 'infrastructure/database/repositories/knex/users.repository';
import { PoliciesEnum } from 'shared/policies';
import { Company } from 'domain/entities/company.entity';
const moment = require('moment');

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

  async validateUser(dto: LoginDTO) {
    const userResponse = await this._apiService
      .post({
        url: `${process.env.SSO_URL}/sessions`,
        data: {
          email: dto.email,
          password: dto.password,
        },
      })
      .catch(() => {
        throw new UnauthorizedException();
      });

    console.log(userResponse.data.user.company);

    type UserResponse = {
      data: { user: Record<string, string> } & { [key: string]: string };
    };

    const connectionResponse = await this._apiService.post({
      url: `${process.env.SSO_URL}/globals/conn-all-companies`,
      data: {
        application_name: process.env.APP_NAME,
        company_id: userResponse.data.user.company.id,
      },
      config: {
        headers: {
          Authorization: `Bearer ${(userResponse as UserResponse).data.token}`,
        },
      },
    });

    console.log(connectionResponse.data);

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

    const usersRepositoryInstance = new UsersRepository(this._cache, null);

    usersRepositoryInstance.setKnexInstanceOverride({
      ...connection,
      database: connection.database_name,
      user: connection.username,
      company_id: userResponse.data.user.company.id as string,
    });

    const expireDate = moment(new Date())
      .add(PoliciesEnum.SESSION_EXPIRATION / 60, 'hours')
      .toDate();

    usersRepositoryInstance.createSession({
      user_id: (userResponse as UserResponse).data.user.id,
      token: (userResponse as UserResponse).data.token,
      expires_at: expireDate,
    });

    return new UserCompanyAggregate(
      new User(
        userResponse.data.user.id,
        userResponse.data.user.email,
        userResponse.data.user.first_name,
        userResponse.data.user.last_name,
        userResponse.data.user.full_name,
        userResponse.data.token,
        null,
      ),
      new Company(
        userResponse.data.user.company.id,
        userResponse.data.user.company.name,
        userResponse.data.user.company.corpoate_name,
        userResponse.data.user.company.patron,
        userResponse.data.user.company.cnpj,
        userResponse.data.user.company.ie,
      ),
    );
  }
}
