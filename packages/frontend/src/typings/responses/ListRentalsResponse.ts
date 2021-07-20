import type { Rental } from '../entities/Rental';

export interface ListRentalsResponse {
  data: Rental[];
  page: number;
  limit: number;
  totalCount: number;
}
