import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersRepository } from 'src/customers/customers.repository';
import { MoviesRepository } from 'src/movies/movies.repository';
import { RentalsController } from './rentals.controller';
import { RentalsRepository } from './rentals.repository';
import { RentalsService } from './rentals.service';

@Module({
  controllers: [RentalsController],
  imports: [
    TypeOrmModule.forFeature([
      RentalsRepository,
      MoviesRepository,
      CustomersRepository,
    ]),
  ],
  providers: [RentalsService],
})
export class RentalsModule {}
