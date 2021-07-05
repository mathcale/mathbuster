import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateRentalDto } from './dto/create-rental.dto';
import { ListRentalsFilterDto } from './dto/list-rentals-filter.dto';
import { PaginatedListRentalsDto } from './dto/paginated-list-rentals.dto';
import { Rental } from './entities/rental.entity';
import { RentalsService } from './rentals.service';

@Controller('rentals')
@ApiTags('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  @ApiOperation({ summary: 'Lists all rentals' })
  @ApiQuery({ type: ListRentalsFilterDto })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of rentals',
    type: PaginatedListRentalsDto,
  })
  @ApiResponse({ status: 500, description: 'Unexpected server error' })
  findAll(
    @Query() listRentalsFilterDto: ListRentalsFilterDto,
  ): Promise<PaginatedListRentalsDto | never> {
    listRentalsFilterDto.page = Number(listRentalsFilterDto.page || 1);
    listRentalsFilterDto.limit = Number(listRentalsFilterDto.limit || 10);

    return this.rentalsService.findAll({
      ...listRentalsFilterDto,
      limit: listRentalsFilterDto.limit > 10 ? 10 : listRentalsFilterDto.limit,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get rental by id' })
  @ApiResponse({ status: 200, description: 'The found rental', type: Rental })
  @ApiResponse({ status: 404, description: 'Rental not found' })
  findOne(@Param('id') id: string): Promise<Rental | never> {
    return this.rentalsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Creates a movie' })
  @ApiResponse({ status: 201, description: 'Created', type: Rental })
  @ApiResponse({
    status: 409,
    description: 'Movie with specified title already exists',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  create(@Body() createMovieDto: CreateRentalDto): Promise<Rental | never> {
    return this.rentalsService.create(createMovieDto);
  }
}
