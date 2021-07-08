import { ApiProperty } from '@nestjs/swagger';

export class ListCustomersFilterDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
