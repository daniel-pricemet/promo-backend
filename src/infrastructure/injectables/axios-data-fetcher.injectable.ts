import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {
  IDataFetcherProvider,
  RequestParameters,
} from 'domain/contracts/data-fetch-provider.contract';

@Injectable()
export class AxiosDataFetcherProvider implements IDataFetcherProvider {
  private _axios: AxiosInstance;
  private _tries: number;

  constructor() {
    this._tries = 0;

    this._axios = axios.create();

    // Retry request on error
    this._axios.interceptors.response.use(
      (response) => {
        this._tries = 0;
        return response;
      },
      async (error) => {
        if (error.response.status >= 400 && error.response.status < 600) {
          if (this._tries < 3) {
            this._tries++;

            // Wait an exponential amount of time before retrying based on the number of tries
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 * 2 ** this._tries),
            );

            return this._axios(error.config);
          } else {
            this._tries = 0;
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      },
    );
  }
  public async get({
    url,
    data,
    config,
  }: RequestParameters): Promise<{ data: unknown; [key: string]: unknown }> {
    return this._axios.get(url, config);
  }

  public async post({
    url,
    data,
    config,
  }: RequestParameters): Promise<{ data: unknown; [key: string]: unknown }> {
    return this._axios.post(url, data, config);
  }

  public async put({
    url,
    data,
    config,
  }: RequestParameters): Promise<{ data: unknown; [key: string]: unknown }> {
    return this._axios.put(url, data, config);
  }

  public async delete({
    url,
    data,
    config,
  }: RequestParameters): Promise<{ data: unknown; [key: string]: unknown }> {
    return this._axios.delete(url, config);
  }
}
