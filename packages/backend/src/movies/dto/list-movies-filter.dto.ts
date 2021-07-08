import { ApiProperty } from '@nestjs/swagger';

export class ListMoviesFilterDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
