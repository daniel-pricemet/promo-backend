import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Knex } from 'knex';
import { getKnexInstance } from '../../knex';
import { Cache } from 'cache-manager';
import { IDatabaseConnection } from 'domain/interfaces/database-connection.interface';

@Injectable()
export class BaseKnexRepository {
  private knexInstanceOverride: Knex;

  constructor(
    @Inject(REQUEST) private readonly _request: Request,
    @Inject(CACHE_MANAGER) private readonly _cache: Cache,
  ) {}

  protected async getKnexInstance(): Promise<Knex> {
    if (this.knexInstanceOverride) return this.knexInstanceOverride;

    const token = this._request.headers.authorization.split(' ')[1];

    const connection = await this._cache.get<IDatabaseConnection>(token);

    return getKnexInstance(connection);
  }

  public setKnexInstanceOverride(knexInstance: Knex): void {
    this.knexInstanceOverride = knexInstance;
  }

  public clearKnexInstanceOverride(): void {
    this.knexInstanceOverride = undefined;
  }
}
