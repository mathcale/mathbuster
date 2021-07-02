import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersRepository } from './customers.repository';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomersRepository)
    private customersRepository: CustomersRepository,
  ) {}

  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer | never> {
    return await this.customersRepository.createCustomer(createCustomerDto);
  }

  findAll() {
    return `This action returns all customers`;
  }

  async findOne(id: string): Promise<Customer | never> {
    const found = await this.customersRepository.findOne(id, {
      select: [
        'id',
        'name',
        'age',
        'email',
        'phone',
        'favoriteGenres',
        'address',
        'complement',
        'number',
        'neighborhood',
        'city',
        'zipCode',
        'state',
        'country',
        'enabled',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
