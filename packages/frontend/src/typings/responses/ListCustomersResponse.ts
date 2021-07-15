import { Customer } from '../entities/Customer';

export interface ListCustomersResponse {
  data: Customer[];
  page: number;
  limit: number;
  totalCount: number;
}
