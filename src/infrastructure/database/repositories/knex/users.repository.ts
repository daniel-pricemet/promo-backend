import { Injectable } from '@nestjs/common';
import { UserByPrimaryDTO } from 'application/DTOs/user-by-primary.dto';
import { IUsersRepository } from 'domain/contracts/users-repository.contract';
import { User } from 'domain/entities/user.entity';
import { BaseKnexRepository } from './base-knex.repository';

@Injectable()
export class UsersRepository
  extends BaseKnexRepository
  implements IUsersRepository
{
  findByPrimary(dto: UserByPrimaryDTO): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}
