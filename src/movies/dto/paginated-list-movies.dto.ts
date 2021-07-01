import { Movie } from '../entities/movie.entity';

export class PaginatedListMoviesDto {
  data: Movie[];
  page: number;
  limit: number;
  totalCount: number;
}
