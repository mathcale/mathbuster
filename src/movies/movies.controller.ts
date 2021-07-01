import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
} from '@nestjs/common';

import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ListMoviesFilterDto } from './dto/list-movies-filter.dto';
import { PaginatedListMoviesDto } from './dto/paginated-list-movies.dto';

@Controller('movies')
export class MoviesController {
  private logger = new Logger('MoviesController', true);

  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    this.logger.log('Creating movie...');

    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll(
    @Query() listMoviesFilterDto: ListMoviesFilterDto,
  ): Promise<PaginatedListMoviesDto> {
    listMoviesFilterDto.page = Number(listMoviesFilterDto.page || 1);
    listMoviesFilterDto.limit = Number(listMoviesFilterDto.limit || 10);

    return this.moviesService.findAll({
      ...listMoviesFilterDto,
      limit: listMoviesFilterDto.limit > 10 ? 10 : listMoviesFilterDto.limit,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
