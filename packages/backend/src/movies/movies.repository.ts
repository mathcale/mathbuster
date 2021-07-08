import {
  ConflictException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title, overview, genres, releaseDate, isAdult, availableCopies } =
      createMovieDto;

    try {
      const movie = this.create({
        title,
        overview,
        genres,
        releaseDate,
        isAdult,
        availableCopies,
      });

      await this.save(movie);

      return movie;
    } catch (err) {
      throw err.code && +err.code === 11000 ? new ConflictException() : err;
    }
  }

  async decrementStock(movieId: string): Promise<void | never> {
    const movie = await this.findOne(movieId);

    if (!movie) {
      throw new NotFoundException({ message: 'Movie not found!' });
    }

    if (movie.availableCopies - 1 < 0) {
      throw new UnprocessableEntityException({
        message: 'This movie is out of stock',
      });
    }

    movie.availableCopies--;
    await this.save(movie);
  }

  async incrementStock(movieId: string): Promise<void | never> {
    const movie = await this.findOne(movieId);

    if (!movie) {
      throw new NotFoundException({ message: 'Movie not found!' });
    }

    movie.availableCopies++;
    await this.save(movie);
  }
}
