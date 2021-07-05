import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateRentalDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Property "customerId" cannot be empty' })
  @IsMongoId({ message: 'Property "customerId" must be an ObjectID' })
  customerId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Property "movieId" cannot be empty' })
  @IsMongoId({ message: 'Property "movieId" must be an ObjectID' })
  movieId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Property "scheduledReturnDate" cannot be empty' })
  @IsDateString(
    {},
    { message: 'Property "scheduledReturnDate" must be a valid date' },
  )
  scheduledReturnDate: Date;
}
