import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Knex } from 'knex';
import { getKnexInstance } from '../../knex';
import { Cache } from 'cache-manager';
import { IDatabaseConnection } from 'domain/interfaces/database-connection.interface';

@Injectable()
export class BaseKnexRepository {
  private connectionOverride: IDatabaseConnection;

  constructor(
    @Inject(CACHE_MANAGER) private readonly _cache: Cache,
    @Inject(REQUEST) private readonly _request?: Request,
  ) {}

  protected async getKnexInstance(): Promise<Knex> {
    if (this.connectionOverride)
      return getKnexInstance(this.connectionOverride);

    const token = this._request?.headers?.authorization?.split?.(' ')?.[1];

    const connection = await this._cache.get<IDatabaseConnection>(token);

    return getKnexInstance(connection);
  }

  public setKnexInstanceOverride(connectionInfo: IDatabaseConnection): void {
    this.connectionOverride = connectionInfo;
  }

  public clearKnexInstanceOverride(): void {
    this.connectionOverride = undefined;
  }
}
