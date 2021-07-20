import { ApiRequestError } from '../errors';
import type { Rental } from '../typings/entities/Rental';
import type { CreateRentalRequest } from '../typings/requests/CreateRentalRequest';
import type { EditRentalRequest } from '../typings/requests/EditRentalRequest';
import type { ApiErrorResponse } from '../typings/responses/ApiErrorResponse';
import type { ListRentalsResponse } from '../typings/responses/ListRentalsResponse';

export const RentalsService = {
  findAll: async (page: number, limit: number = 10): Promise<ListRentalsResponse | never> => {
    const response = await fetch(`/api/rentals?page=${page + 1}&limit=${limit}`);

    if (!response.ok) {
      const { error }: { error: ApiErrorResponse } = await response.json();
      throw new ApiRequestError(error.statusCode, error.message, error?.error);
    }

    const pageResponse: ListRentalsResponse = await response.json();
    return pageResponse;
  },
  findOne: async (id: string): Promise<Rental | never> => {
    const response = await fetch(`/api/rentals/${id}`);

    if (!response.ok) {
      const { error }: { error: ApiErrorResponse } = await response.json();
      throw new ApiRequestError(error.statusCode, error.message, error?.error);
    }

    const movie: Rental = await response.json();
    return movie;
  },
  create: async (requestBody: CreateRentalRequest): Promise<Rental | never> => {
    const response = await fetch(`/api/rentals/create`, {
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

    const createdRental: Rental = await response.json();
    return createdRental;
  },
  update: async (id: string, requestBody: EditRentalRequest): Promise<void | never> => {
    const response = await fetch(`/api/rentals/${id}/edit`, {
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
