/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDataFetcherProvider {
  get(
    url: string,
    config?: object,
  ): Promise<{ data: unknown; [key: string]: any }>;
  post(
    url: string,
    data?: object,
    config?: object,
  ): Promise<{ data: any; [key: string]: any }>;
  put(
    url: string,
    data?: object,
    config?: object,
  ): Promise<{ data: any; [key: string]: any }>;
  delete(
    url: string,
    config?: object,
  ): Promise<{ data: any; [key: string]: any }>;
}
