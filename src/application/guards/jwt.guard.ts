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
import { IDatabaseConnectionFromSSO } from 'domain/interfaces/database-connection.interface';
import { Cache } from 'cache-manager';
import { UsersRepository } from 'infrastructure/database/repositories/knex/users.repository';
import { User, UserCompanyAggregate } from 'domain/entities/user.entity';
import { Company } from 'domain/entities/company.entity';

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

    // Se não é necessário autenticação, retornar true para a rota executar normalmente

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    // Validando a formatação do header do token

    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) throw new UnauthorizedException('MISSING_TOKEN');

    const parts = tokenHeader.split(' ');

    if (parts.length !== 2) throw new UnauthorizedException('INVALID_TOKEN');

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
      throw new UnauthorizedException('MALFORMED_TOKEN');

    // Conferindo se o token expirou no SSO
    const userResponse = await this._apiService
      .post({
        url: `${process.env.SSO_URL}/users/token-user`,
        config: {
          headers: {
            Authorization: tokenHeader,
          },
        },
      })
      .catch(() => {
        throw new UnauthorizedException('GENERIC');
      });

    // Obtendo conexão com o banco do usuario para consultar sessions
    const connectionResponse = await this._apiService.post({
      url: `${process.env.SSO_URL}/globals/conn-all-companies`,
      data: {
        application_name: process.env.APP_NAME,
        company_id: userResponse.data.company.id,
      },
      config: {
        headers: {
          Authorization: tokenHeader,
        },
      },
    });

    type ConnectionResponse = {
      data: Array<Record<keyof IDatabaseConnectionFromSSO, string>>;
    };

    const [connection] = (connectionResponse as ConnectionResponse).data;

    // Validando se a session deste token foi revogada ou se está ativa
    const usersRepositoryInstance = new UsersRepository(this._cache, req);

    usersRepositoryInstance.setKnexInstanceOverride({
      ...connection,
      database: connection.database_name,
      user: connection.username,
      company_id: userResponse.data.company.id as string,
    });

    const session = await usersRepositoryInstance.findSession(token);

    if (!session || session?.expires_at < new Date())
      throw new UnauthorizedException('EXPIRED_SESSION');

    req.user = new UserCompanyAggregate(
      new User(
        userResponse.data.id,
        userResponse.data.email,
        userResponse.data.first_name,
        userResponse.data.last_name,
        userResponse.data.full_name,
        token,
        null,
        null,
      ),
      new Company(
        userResponse.data.company.id,
        userResponse.data.company.name,
        userResponse.data.company.corpoate_name,
        userResponse.data.company.patron,
        userResponse.data.company.cnpj,
        userResponse.data.company.ie,
      ),
    );

    return req.user;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('INVALID_TOKEN');
    }

    return user;
  }
}
