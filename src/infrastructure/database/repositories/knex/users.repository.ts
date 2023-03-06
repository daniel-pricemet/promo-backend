import { Injectable } from '@nestjs/common';
import { UserByPrimaryDTO } from 'application/DTOs/user-by-primary.dto';
import { IUsersRepository } from 'domain/contracts/users-repository.contract';
import { Session } from 'domain/entities/session.entity';
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

  public async createSession(columns: Partial<Session>): Promise<void> {
    const knex = await this.getKnexInstance();

    await knex('sessions').withSchema('promo').insert(columns);
    await knex.destroy();
  }

  public async findSession(token: string) {
    const knex = await this.getKnexInstance();

    const session = await knex('sessions')
      .withSchema('promo')
      .where({ token })
      .first();

    await knex.destroy();

    return session;
  }
}
