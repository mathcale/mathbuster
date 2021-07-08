import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MoviesRepository } from './movies.repository';

@Module({
  controllers: [MoviesController],
  imports: [TypeOrmModule.forFeature([MoviesRepository])],
  providers: [MoviesService],
})
export class MoviesModule {}
