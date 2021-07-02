import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsDateString,
  IsBoolean,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Property "title" cannot be empty' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Property "overview" cannot be empty' })
  overview: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Property "genres" must contain at least one item' })
  genres: string[];

  @ApiProperty()
  @IsNotEmpty({ message: 'Property "releaseDate" cannot be empty' })
  @IsDateString({}, { message: 'Property "releaseDate" must be a valid date' })
  releaseDate: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Property "isAdult" cannot be empty' })
  @IsBoolean({ message: 'Property "isAdult" must be a boolean' })
  isAdult: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: 'Property "availableCopies" cannot be empty' })
  @IsInt({ message: 'Property "availableCopies" must be an integer' })
  @IsPositive({
    message: 'Property "availableCopies" must be a positive integer',
  })
  availableCopies: number;
}
