import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ForbiddenException } from 'application/exceptions/generic/forbidden.exception';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    return true;

    // const userRolesAsString = user.roles.map((role: Role) => role.name);

    // if (userRolesAsString.includes(RoleEnum.ADMIN)) return true;

    // const hasRole = () =>
      // requiredRoles.every((role) => userRolesAsString.includes(role));

    // if (user && user.roles && hasRole()) {
      // return true;
    // }

    // throw new ForbiddenException('GENERIC');
  }
}
