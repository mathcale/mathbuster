import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ListCustomersFilterDto } from './dto/list-customers-filter.dto';
import { PaginatedListCustomersDto } from './dto/paginated-list-customers.dto';
import { Customer } from './entities/customer.entity';

@Controller('customers')
@ApiTags('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a customer' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created one customer',
    type: Customer,
  })
  @ApiResponse({
    status: 409,
    description: 'Customer with specified phone already exists',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer | never> {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lists all customers' })
  @ApiQuery({ type: ListCustomersFilterDto })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of customers',
    type: PaginatedListCustomersDto,
  })
  @ApiResponse({ status: 500, description: 'Unexpected server error' })
  findAll(
    @Query() listCustomersFilterDto: ListCustomersFilterDto,
  ): Promise<PaginatedListCustomersDto | never> {
    listCustomersFilterDto.page = Number(listCustomersFilterDto.page || 1);
    listCustomersFilterDto.limit = Number(listCustomersFilterDto.limit || 10);

    return this.customersService.findAll({
      ...listCustomersFilterDto,
      limit:
        listCustomersFilterDto.limit > 100 ? 100 : listCustomersFilterDto.limit,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer by id' })
  @ApiResponse({
    status: 200,
    description: 'The found customer',
    type: Customer,
  })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit specific customer' })
  @ApiResponse({ status: 200, description: 'Customer successfully edited' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  @ApiResponse({ status: 500, description: 'Unexpected server error' })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<void | never> {
    return this.customersService.update(id, updateCustomerDto);
  }
}
