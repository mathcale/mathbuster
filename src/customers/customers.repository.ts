import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer> {
  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const salt = bcrypt.genSaltSync();
    const hashedSecret = bcrypt.hashSync(
      createCustomerDto.secret.toString(),
      salt,
    );

    try {
      const customer = this.create({
        ...createCustomerDto,
        secret: hashedSecret,
      });

      await this.save(customer);
      delete customer.secret;

      return customer;
    } catch (err) {
      throw err.code && +err.code === 11000 ? new ConflictException() : err;
    }
  }
}
