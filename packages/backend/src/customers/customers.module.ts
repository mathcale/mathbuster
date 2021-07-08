import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomersRepository } from './customers.repository';

@Module({
  controllers: [CustomersController],
  imports: [TypeOrmModule.forFeature([CustomersRepository])],
  providers: [CustomersService],
})
export class CustomersModule {}
