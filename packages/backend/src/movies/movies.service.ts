import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateMovieDto } from './dto/create-movie.dto';
import { ListMoviesFilterDto } from './dto/list-movies-filter.dto';
import { PaginatedListMoviesDto } from './dto/paginated-list-movies.dto';
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

  async findAll(
    listMoviesFilterDto: ListMoviesFilterDto,
  ): Promise<PaginatedListMoviesDto> {
    const skippedItems =
      (listMoviesFilterDto.page - 1) * listMoviesFilterDto.limit;

    const totalCount = await this.moviesRepository.count();
    const products = await this.moviesRepository.find({
      take: listMoviesFilterDto.limit,
      skip: skippedItems,
    });

    const response: PaginatedListMoviesDto = {
      totalCount,
      page: listMoviesFilterDto.page,
      limit: listMoviesFilterDto.limit,
      data: products,
    };

    return response;
  }

  async findOne(id: string): Promise<Movie | never> {
    const found = await this.moviesRepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<void | never> {
    const found = await this.moviesRepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    await this.moviesRepository.update(id, updateMovieDto);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.moviesRepository.delete(id);
  }
}
