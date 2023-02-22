import { Controller, Get, Param, Req } from '@nestjs/common';
import { ForbiddenException } from 'application/exceptions/generic/forbidden.exception';
import { GetUserService } from 'application/services/users/get-user.service';
import { JsonResponse } from 'domain/contracts/json-response.contract';
import { User } from 'domain/entities/user.entity';
import { Request } from 'express';
import { CurrentUser } from 'presentation/decorators/current-user.decorator';
import { Ok } from 'presentation/response-types/success.types';
import parser from 'shared/parser';
import { validate } from 'shared/validate';

@Controller('/users')
export class UserController {
  constructor(
    private readonly _getUserService: GetUserService,
  ) {}

  @Get()
  async getUser(
    @CurrentUser('email') currentEmail: string,
  ): Promise<JsonResponse<'user', User>> {
    const user = await this._getUserService.execute({
      email: currentEmail,
    });

    return Ok({ user });
  }

  @Get('/:id')
  async getUserById(
    @Param('id') id: string, 
    @CurrentUser() currentUser: User
    ): Promise<JsonResponse<'user', User>> {
    if (id === 'all') {
      return this.getAllUsers();
    }

    const user = await this._getUserService.execute({
      id: parser.tryStringToNumber(id),
    });

    return Ok({ user });
  }

  async getAllUsers(): Promise<JsonResponse<'users', User[]>> {
    const users = await this._getUserService.executeAll();

    return Ok({ users });
  }
}
