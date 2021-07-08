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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ListMoviesFilterDto } from './dto/list-movies-filter.dto';
import { PaginatedListMoviesDto } from './dto/paginated-list-movies.dto';
import { Movie } from './entities/movie.entity';

@Controller('movies')
@ApiTags('movies')
export class MoviesController {
  private logger = new Logger('MoviesController', true);

  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a movie' })
  @ApiResponse({ status: 201, description: 'Created', type: Movie })
  @ApiResponse({
    status: 409,
    description: 'Movie with specified title already exists',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie | never> {
    this.logger.log('Creating movie...');

    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lists all movies' })
  @ApiQuery({ type: ListMoviesFilterDto })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of movies',
    type: PaginatedListMoviesDto,
  })
  @ApiResponse({ status: 500, description: 'Unexpected server error' })
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
  @ApiOperation({ summary: 'Get movie by id' })
  @ApiResponse({ status: 200, description: 'The found movie', type: Movie })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  findOne(@Param('id') id: string): Promise<Movie | never> {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit specific movie' })
  @ApiResponse({ status: 200, description: 'Movie successfully edited' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  @ApiResponse({ status: 500, description: 'Unexpected server error' })
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<void | never> {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiResponse({ status: 200, description: 'Movie successfully deleted' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  @ApiResponse({ status: 500, description: 'Unexpected server error' })
  remove(@Param('id') id: string): Promise<void | never> {
    return this.moviesService.remove(id);
  }
}
