import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { IUserProvider } from 'domain/contracts/user-provider.contract';
import { UserCompanyAggregate } from 'domain/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class UserProvider implements IUserProvider {
  constructor(@Inject(REQUEST) private readonly _request?: Request) {}

  public get user(): UserCompanyAggregate {
    return this._request.user;
  }
}
