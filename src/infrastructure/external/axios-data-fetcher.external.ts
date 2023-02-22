import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IDataFetcherProvider } from 'domain/contracts/data-fetch-provider.contract';

@Injectable()
export class AxiosDataFetcherProvider implements IDataFetcherProvider {
  public async get(
    url: string,
    config?: unknown,
  ): Promise<{ data: unknown; [key: string]: unknown }> {
    return axios.get(url, config);
  }

  public async post(
    url: string,
    data?: unknown,
    config?: unknown,
  ): Promise<{ data: unknown; [key: string]: unknown }> {
    return axios.post(url, data, config);
  }

  public async put(
    url: string,
    data?: unknown,
    config?: unknown,
  ): Promise<{ data: unknown; [key: string]: unknown }> {
    return axios.put(url, data, config);
  }

  public async delete(
    url: string,
    config?: unknown,
  ): Promise<{ data: unknown; [key: string]: unknown }> {
    return axios.delete(url, config);
  }
}
