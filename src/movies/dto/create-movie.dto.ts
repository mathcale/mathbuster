import {
  IsNotEmpty,
  IsDateString,
  IsBoolean,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty({ message: 'Property "title" cannot be empty' })
  title: string;

  @IsNotEmpty({ message: 'Property "overview" cannot be empty' })
  overview: string;

  @IsNotEmpty({ message: 'Property "genres" must contain at least one item' })
  genres: string[];

  @IsNotEmpty({ message: 'Property "releaseDate" cannot be empty' })
  @IsDateString({}, { message: 'Property "releaseDate" must be a valid date' })
  releaseDate: string;

  @IsNotEmpty({ message: 'Property "isAdult" cannot be empty' })
  @IsBoolean({ message: 'Property "isAdult" must be a boolean' })
  isAdult: boolean;

  @IsNotEmpty({ message: 'Property "availableCopies" cannot be empty' })
  @IsInt({ message: 'Property "availableCopies" must be an integer' })
  @IsPositive({
    message: 'Property "availableCopies" must be a positive integer',
  })
  availableCopies: number;
}
