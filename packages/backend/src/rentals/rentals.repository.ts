import { EntityRepository, Repository } from 'typeorm';
import { CreateRentalDto } from './dto/create-rental.dto';
import { Rental } from './entities/rental.entity';

@EntityRepository(Rental)
export class RentalsRepository extends Repository<Rental> {
  async rentMovie(createRentalDto: CreateRentalDto): Promise<Rental | never> {
    const { customerId, movieId, scheduledReturnDate } = createRentalDto;

    const rental = this.create({
      customerId,
      movieId,
      scheduledReturnDate,
    });

    await this.save(rental);

    return rental;
  }
}
