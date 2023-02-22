import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';

import { LoginDTO } from 'application/DTOs/login.dto';
import { UnauthorizedException } from 'application/exceptions/generic/unauthorized.exception';
import { AuthService } from 'application/services/auth/auth.service';
import { Request } from 'express';
import { Public } from 'presentation/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get()
  getHello() {
    return `PROMO by Pricemet.`;
  }

  @Public()
  @Post('/auth/login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request) {
    const dto = new LoginDTO(req.body.email, req.body.password);
    const user = await this.authService.validateUser(dto);

    if (!user) {
      throw new UnauthorizedException('INVALID_CREDENTIALS');
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      error: null,
      data: {
        token: user.token,
        user: {
          ...user,
          id: user.id.toString(),
        },
      },
    };
  }
}
