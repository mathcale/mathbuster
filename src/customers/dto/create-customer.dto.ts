import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Property "name" cannot be empty' })
  name: string;

  @ApiProperty({ required: false })
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Property "phone" cannot be empty' })
  phone: string;

  @ApiProperty({ required: false })
  favoriteGenres?: string[];

  @ApiProperty()
  @IsNotEmpty({ message: 'Property "address" cannot be empty' })
  address: string;

  @ApiProperty({ required: false })
  complement?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Property "number" cannot be empty' })
  number: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Property "neighborhood" cannot be empty' })
  neighborhood: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Property "city" cannot be empty' })
  city: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Property "zipCode" cannot be empty' })
  zipCode: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Property "state" cannot be empty' })
  @Length(2, 2)
  state: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Property "country" cannot be empty' })
  @Length(3, 3)
  country: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Property "secret" cannot be empty' })
  @Length(6, 6)
  @Matches(/^[0-9]*$/, { message: 'Property "secret" must have 6 numbers' })
  secret: string;
}
