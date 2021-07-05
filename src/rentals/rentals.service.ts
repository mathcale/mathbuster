import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CustomersRepository } from 'src/customers/customers.repository';
import { MoviesRepository } from 'src/movies/movies.repository';
import { CreateRentalDto } from './dto/create-rental.dto';
import { Rental } from './entities/rental.entity';
import { RentalsRepository } from './rentals.repository';

@Injectable()
export class RentalsService {
  private logger: Logger = new Logger('RentalsService', true);

  constructor(
    @InjectRepository(RentalsRepository)
    private rentalsRepository: RentalsRepository,

    @InjectRepository(MoviesRepository)
    private moviesRepository: MoviesRepository,

    @InjectRepository(CustomersRepository)
    private customersRepository: CustomersRepository,
  ) {}

  async create(createRentalDto: CreateRentalDto): Promise<Rental | never> {
    const { movieId, customerId } = createRentalDto;

    this.logger.log('Searching customer...');
    const customer = await this.customersRepository.findOne(customerId);

    if (!customer) {
      throw new NotFoundException({ message: 'Customer not found!' });
    }

    this.logger.log('Searching movie...');
    const movie = await this.moviesRepository.findOne(movieId);

    if (!movie) {
      throw new NotFoundException({ message: 'Movie not found!' });
    }

    this.logger.log('Checking if movie is age-restricted...');

    if (movie.isAdult && customer.age < 18) {
      throw new UnprocessableEntityException({
        message:
          'Customer not allowed to rent this movie since it is age-restricted',
      });
    }

    this.logger.log('Decrementing stock...');
    await this.moviesRepository.decrementStock(movieId);

    this.logger.log('Renting movie to customer...');
    return await this.rentalsRepository.rentMovie(createRentalDto);
  }
}
