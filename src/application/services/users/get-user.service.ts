import { Inject, Injectable } from '@nestjs/common';
import { User } from 'domain/entities/user.entity';
import { IUsersRepository } from 'domain/contracts/users-repository.contract';
import { INJECTABLES } from 'shared/injectables';
import { GetUserDTO } from 'application/DTOs/get-user.dto';
import { NotFoundException } from 'application/exceptions/generic/not-found.exception';
import { IDataFetcherProvider } from 'domain/contracts/data-fetch-provider.contract';
import { IUserProvider } from 'domain/contracts/user-provider.contract';

@Injectable()
export class GetUserService {
  constructor(
    @Inject(INJECTABLES.IUsersRepository)
    private readonly _usersRepository: IUsersRepository,
    @Inject(INJECTABLES.IDataFetcherProvider)
    private readonly _dataFetcherProvider: IDataFetcherProvider,
    @Inject(INJECTABLES.IUserProvider)
    private readonly _userProvider: IUserProvider,
  ) {}

  public async execute(data: Partial<GetUserDTO>): Promise<User | undefined> {
    const { data: userResponse } = await this._dataFetcherProvider.post({
      url: `${process.env.SSO_URL}/users/list`,
      data: {
        company_id: this._userProvider.user.company.id,
        application_name: process.env.APPLICATION_NAME,
        user_id: data.id,
      },
      config: {
        headers: {
          Authorization: `Bearer ${this._userProvider.user.token}`,
        },
      },
    });

    if (!userResponse) throw new NotFoundException('USER');

    return new User(
      userResponse.id,
      userResponse.email,
      userResponse.first_name,
      userResponse.last_name,
      userResponse.full_name,
      null,
      userResponse.user_image_base64,
    );
  }

  public async executeAll(): Promise<User[]> {
    const { data: userResponse } = await this._dataFetcherProvider.post({
      url: `${process.env.SSO_URL}/users/list`,
      data: {
        company_id: this._userProvider.user.company.id,
        application_name: process.env.APPLICATION_NAME,
      },
      config: {
        headers: {
          Authorization: `Bearer ${this._userProvider.user.token}`,
        },
      },
    });

    const users = userResponse.map((user) => {
      return new User(
        user.id,
        user.email,
        user.first_name,
        user.last_name,
        user.full_name,
        null,
        user.user_image_base64,
      );
    });

    return users;
  }
}
