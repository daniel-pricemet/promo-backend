import { Inject, Injectable } from '@nestjs/common';
import { User } from 'domain/entities/user.entity';
import { IUsersRepository } from 'domain/contracts/users-repository.contract';
import { INJECTABLES } from 'shared/injectables';
import { GetUserDTO } from 'application/DTOs/get-user.dto';
import { NotFoundException } from 'application/exceptions/generic/not-found.exception';

@Injectable()
export class GetUserService {
  constructor(
    @Inject(INJECTABLES.IUsersRepository)
    private readonly _usersRepository: IUsersRepository,
  ) {}

  public async execute(data: Partial<GetUserDTO>): Promise<User | undefined> {
    const user = await this._usersRepository.findByPrimary(data);

    if (!user) throw new NotFoundException('USER');

    return user;
  }

  public async executeAll(): Promise<User[]> {
    return this._usersRepository.findAll();
  }
}
