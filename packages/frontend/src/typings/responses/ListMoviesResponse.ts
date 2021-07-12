import { Movie } from '../entities/Movie';

export interface ListMoviesResponse {
  data: Movie[];
  page: number;
  limit: number;
  totalCount: number;
}
