import { ApiRequestError } from '../errors';
import { Customer } from '../typings/entities/Customer';
import { CreateCustomerRequest } from '../typings/requests/CreateCustomerRequest';
import { EditCustomerRequest } from '../typings/requests/EditCustomerRequest';
import { ApiErrorResponse } from '../typings/responses/ApiErrorResponse';
import { ListCustomersResponse } from '../typings/responses/ListCustomersResponse';

export const CustomersService = {
  findAll: async (page: number, limit: number = 10): Promise<ListCustomersResponse | never> => {
    const response = await fetch(`/api/customers?page=${page + 1}&limit=${limit}`);

    if (!response.ok) {
      const { error }: { error: ApiErrorResponse } = await response.json();
      throw new ApiRequestError(error.statusCode, error.message, error?.error);
    }

    const pageResponse: ListCustomersResponse = await response.json();
    return pageResponse;
  },
  findOne: async (id: string): Promise<Customer | never> => {
    const response = await fetch(`/api/customers/${id}`);

    if (!response.ok) {
      const { error }: { error: ApiErrorResponse } = await response.json();
      throw new ApiRequestError(error.statusCode, error.message, error?.error);
    }

    const customer: Customer = await response.json();
    return customer;
  },
  create: async (requestBody: CreateCustomerRequest): Promise<Customer | never> => {
    const response = await fetch(`/api/customers/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const { error }: { error: ApiErrorResponse } = await response.json();
      console.log();

      throw new ApiRequestError(error.statusCode, error.message, error?.error);
    }

    const createdCustomer: Customer = await response.json();
    return createdCustomer;
  },
  update: async (id: string, requestBody: EditCustomerRequest): Promise<void | never> => {
    const response = await fetch(`/api/customers/${id}/edit`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const { error }: { error: ApiErrorResponse } = await response.json();
      console.log();

      throw new ApiRequestError(error.statusCode, error.message, error?.error);
    }

    await response.json();
  },
};
