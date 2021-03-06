import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ListCustomersFilterDto } from './dto/list-customers-filter.dto';
import { PaginatedListCustomersDto } from './dto/paginated-list-customers.dto';
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

  async findAll(
    listCustomersFilterDto: ListCustomersFilterDto,
  ): Promise<any | never> {
    const skippedItems =
      (listCustomersFilterDto.page - 1) * listCustomersFilterDto.limit;

    const totalCount = await this.customersRepository.count();
    const products = await this.customersRepository.find({
      take: listCustomersFilterDto.limit,
      skip: skippedItems,
    });

    const response: PaginatedListCustomersDto = {
      totalCount,
      page: listCustomersFilterDto.page,
      limit: listCustomersFilterDto.limit,
      data: products,
    };

    return response;
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

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<void | never> {
    const found = await this.customersRepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    await this.customersRepository.update(id, updateCustomerDto);
  }
}
