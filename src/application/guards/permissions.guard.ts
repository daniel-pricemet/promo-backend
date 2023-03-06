import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ForbiddenException } from 'application/exceptions/generic/forbidden.exception';
import { IUserProvider } from 'domain/contracts/user-provider.contract';
import { INJECTABLES } from 'shared/injectables';
import { GrantsEnum } from 'shared/policies';

@Injectable()
export class GrantsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(INJECTABLES.IUserProvider)
    private readonly _userProvider: IUserProvider,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    //TODO: Retornando true por padrão, implementar validação de cargos necessários e de usuário logado para liberar acesso
    return true;
    // if (!requiredRoles) {
    //   return true;
    // }

    // const req = context.switchToHttp().getRequest();

    // const userRolesAsString = this._userProvider.user.roles.map(
    //   (role) => role.name,
    // );

    // if (userRolesAsString.includes(GrantsEnum.ADMIN)) return true;

    // const hasRole = () =>
    //   requiredRoles.every((role) => userRolesAsString.includes(role));

    // if (this._userProvider.user && this._userProvider.user.roles && hasRole()) {
    //   return true;
    // }

    throw new ForbiddenException('GENERIC');
  }
}
