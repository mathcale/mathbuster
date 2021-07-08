import { ApiProperty } from '@nestjs/swagger';

export class ListRentalsFilterDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
