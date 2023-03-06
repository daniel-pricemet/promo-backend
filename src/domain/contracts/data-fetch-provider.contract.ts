/* eslint-disable @typescript-eslint/no-explicit-any */

export type RequestParameters = {
  url: string;
  data?: object;
  config?: object;
};

export interface IDataFetcherProvider {
  get(
    params: RequestParameters,
  ): Promise<{ data: unknown; [key: string]: any }>;
  post(params: RequestParameters): Promise<{ data: any; [key: string]: any }>;
  put(params: RequestParameters): Promise<{ data: any; [key: string]: any }>;
  delete(params: RequestParameters): Promise<{ data: any; [key: string]: any }>;
}
