import { Paginated } from 'application/responses/Paginated.response';

export interface IJsonResponse<T> {
  statusCode: number | string;
  message: string;
  data: T | null;
  error: unknown | unknown[] | null;
}

export type JsonResponse<PNameOrPaginated, T = undefined> = {
  statusCode: number | string;
  message: string;
  data:
    | (PNameOrPaginated extends Paginated<string, unknown>
        ? PNameOrPaginated
        : PNameOrPaginated extends string
        ? { [P in PNameOrPaginated]: T }
        : never)
    | null;
  error: unknown | unknown[] | null;
};
