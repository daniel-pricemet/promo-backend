import {
  ExecutionContext,
  Injectable,
  CanActivate,
  CACHE_MANAGER,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'presentation/decorators/public.decorator';
import { UnauthorizedException } from 'application/exceptions/generic/unauthorized.exception';
import { IDataFetcherProvider } from 'domain/contracts/data-fetch-provider.contract';
import { Inject } from '@nestjs/common/decorators';
import { INJECTABLES } from 'shared/injectables';
import {
  IDatabaseConnection,
  IDatabaseConnectionFromSSO,
} from 'domain/interfaces/database-connection.interface';
import { Cache } from 'cache-manager';
import { UsersRepository } from 'infrastructure/database/repositories/knex/users.repository';
import { getKnexInstance } from 'infrastructure/database/knex';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(Reflector)
    private reflector: Reflector,
    @Inject(INJECTABLES.IDataFetcherProvider)
    private readonly _apiService: IDataFetcherProvider,
    @Inject(CACHE_MANAGER)
    private readonly _cache: Cache,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) throw new UnauthorizedException('MISSING_TOKEN');

    const parts = tokenHeader.split(' ');

    if (parts.length !== 2) throw new UnauthorizedException('INVALID_TOKEN');

    const [scheme] = parts;

    if (!/^Bearer$/i.test(scheme))
      throw new UnauthorizedException('MALFORMED_TOKEN');

    const userResponse = await this._apiService
      .post(`${process.env.SSO_URL}/users/token-user`, null, {
        headers: {
          Authorization: tokenHeader,
        },
      })
      .catch(() => {
        throw new UnauthorizedException('GENERIC');
      });

    if (userResponse.status > 299) {
      throw new UnauthorizedException('GENERIC');
    }

    type UserResponse = {
      data: Record<string, string>;
    };

    const data = {
      application_name: process.env.APP_NAME,
      company_id: userResponse.data.company.id as string,
    };

    const connectionResponse = await this._apiService
      .post(`${process.env.SSO_URL}/globals/conn-all-companies`, data, {
        headers: {
          Authorization: tokenHeader,
        },
      })
      .catch(() => {
        throw new UnauthorizedException('GENERIC');
      });

    type ConnectionResponse = {
      data: Array<Record<keyof IDatabaseConnectionFromSSO, string>>;
    };

    const [connection] = (connectionResponse as ConnectionResponse).data;

    await this._cache.set<IDatabaseConnection>(
      `${parts[1]}`,
      {
        ...connection,
        database: connection.database_name,
        user: connection.username,
        company_id: userResponse.data.company.id as string,
      },
      {
        ttl: 1000 * 60 * 45,
      },
    );

    const usersRepository = new UsersRepository(req, this._cache);

    const dbInstance = await getKnexInstance({
      ...connection,
      database: connection.database_name,
      user: connection.username,
      company_id: userResponse.data.company.id as string,
    });

    usersRepository.setKnexInstanceOverride(dbInstance);

    const existingUser = await usersRepository.findByPrimary({
      email: (userResponse as UserResponse).data.email,
    });

    usersRepository.clearKnexInstanceOverride();
    await dbInstance?.destroy?.();

    if (existingUser.token !== parts[1]) {
      throw new UnauthorizedException('EXPIRED_SESSION');
    }

    req.user = {
      id: existingUser.id,
      email: (userResponse as UserResponse).data.email,
    };

    return req.user;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('INVALID_TOKEN');
    }

    return user;
  }
}
