export class PaginationOptions<T> {
  page?: number;
  limit?: number;
  dto?: T;
}

export interface PayloadWithCount<T> {
  total: number;
  payload: T;
}
