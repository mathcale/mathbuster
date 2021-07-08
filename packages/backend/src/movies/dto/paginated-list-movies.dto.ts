import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '../entities/movie.entity';

export class PaginatedListMoviesDto {
  @ApiProperty({ type: [Movie] })
  data: Movie[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalCount: number;
}
