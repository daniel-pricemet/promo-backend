import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { LoginDTO } from 'application/DTOs/login.dto';
import { UnauthorizedException } from 'application/exceptions/generic/unauthorized.exception';
import { AuthService } from 'application/services/auth/auth.service';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  handleRequest(err, user, info) {
    if (info?.message === 'Missing credentials') {
      throw new UnauthorizedException('MISSING_CREDENTIALS');
    }

    if (err || !user) {
      throw err || new UnauthorizedException('GENERIC');
    }

    return user;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const dto = new LoginDTO(req.body.email, req.body.password);

    const user = await this.authService.validateUser(dto);

    if (!user) {
      throw new UnauthorizedException('INVALID_CREDENTIALS');
    }

    req.user = user;
    return true;
  }
}
