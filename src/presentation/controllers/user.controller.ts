import { Controller, Get, Param, Req } from '@nestjs/common';
import { GetUserService } from 'application/services/users/get-user.service';
import { JsonResponse } from 'domain/interfaces/json-response.interface';
import { User, UserCompanyAggregate } from 'domain/entities/user.entity';
import { CurrentUser } from 'presentation/decorators/current-user.decorator';
import { Ok } from 'presentation/response-types/success.types';

@Controller('/users')
export class UserController {
  constructor(private readonly _getUserService: GetUserService) {}

  @Get()
  async getUser(
    @CurrentUser() user: UserCompanyAggregate,
  ): Promise<JsonResponse<'user', User>> {
    return Ok({ user });
  }

  @Get('/:id')
  async getUserById(
    @Param('id') id: string,
  ): Promise<JsonResponse<'user', User> | JsonResponse<'users', User[]>> {
    if (id === 'all') {
      return this.getAllUsers();
    }

    const user = await this._getUserService.execute({
      id,
    });

    return Ok({ user });
  }

  async getAllUsers(): Promise<JsonResponse<'users', User[]>> {
    const users = await this._getUserService.executeAll();

    return Ok({ users });
  }
}
