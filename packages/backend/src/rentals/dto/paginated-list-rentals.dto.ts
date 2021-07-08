import { ApiProperty } from '@nestjs/swagger';
import { Rental } from '../entities/rental.entity';

export class PaginatedListRentalsDto {
  @ApiProperty({ type: [Rental] })
  data: Rental[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalCount: number;
}
