import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRentalDto } from './dto/create-rental.dto';

import { Rental } from './entities/rental.entity';
import { RentalsService } from './rentals.service';

@Controller('rentals')
@ApiTags('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

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
