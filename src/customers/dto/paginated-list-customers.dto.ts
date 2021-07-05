import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../entities/customer.entity';

export class PaginatedListCustomersDto {
  @ApiProperty({ type: [Customer] })
  data: Customer[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalCount: number;
}
