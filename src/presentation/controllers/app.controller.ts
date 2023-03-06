import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';

import { LoginDTO } from 'application/DTOs/login.dto';
import { AuthService } from 'application/services/auth/auth.service';
import { Request } from 'express';
import { Public } from 'presentation/decorators/public.decorator';
import { Ok } from 'presentation/response-types/success.types';

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
    const userCompanyAggregate = await this.authService.validateUser(dto);

    return Ok(userCompanyAggregate);
  }
}
