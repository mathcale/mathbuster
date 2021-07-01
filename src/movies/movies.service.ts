import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesRepository)
    private moviesRepository: MoviesRepository,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.moviesRepository.createMovie(createMovieDto);
  }

  findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
