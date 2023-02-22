import { PaginationOptions } from 'domain/interfaces/pagination-options.interface';

export type Paginated<PropertyName extends string, T> = {
  total: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;
} & { [P in PropertyName]: T };

export function paginatedStaticDataFromTotal(
  total: number,
  dto: PaginationOptions<unknown>,
) {
  return {
    total: total as number,
    totalPages: Math.ceil(total / dto.limit),
    nextPage:
      dto.page + 1 <= Math.ceil(total / dto.limit) ? dto.page + 1 : null,
    previousPage: dto.page - 1 > 0 ? dto.page - 1 : null,
  };
}
