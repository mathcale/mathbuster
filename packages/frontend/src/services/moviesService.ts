import { ApiRequestError } from '../errors';
import type { Movie } from '../typings/entities/Movie';
import type { ListMoviesResponse } from '../typings/responses/ListMoviesResponse';
import type { CreateMovieRequest } from '../typings/requests/CreateMovieRequest';
import type { EditMovieRequest } from '../typings/requests/EditMovieRequest';
import type { ApiErrorResponse } from '../typings/responses/ApiErrorResponse';

export const MoviesService = {
  findAll: async (page: number, limit: number = 10): Promise<ListMoviesResponse | never> => {
    const response = await fetch(`/api/movies?page=${page + 1}&limit=${limit}`);

    if (!response.ok) {
      const { error }: { error: ApiErrorResponse } = await response.json();
      throw new ApiRequestError(error.statusCode, error.message, error?.error);
    }

    const pageResponse: ListMoviesResponse = await response.json();
    return pageResponse;
  },
  findOne: async (id: string): Promise<Movie | never> => {
    const response = await fetch(`/api/movies/${id}`);

    if (!response.ok) {
      const { error }: { error: ApiErrorResponse } = await response.json();
      throw new ApiRequestError(error.statusCode, error.message, error?.error);
    }

    const movie: Movie = await response.json();
    return movie;
  },
  create: async (requestBody: CreateMovieRequest): Promise<Movie | never> => {
    const response = await fetch(`/api/movies/create`, {
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

    const createdMovie: Movie = await response.json();
    return createdMovie;
  },
  update: async (id: string, requestBody: EditMovieRequest): Promise<void | never> => {
    const response = await fetch(`/api/movies/${id}/edit`, {
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
  delete: async (id: string): Promise<void | never> => {
    const response = await fetch(`/api/movies/${id}/delete`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const { error }: { error: ApiErrorResponse } = await response.json();
      console.log();

      throw new ApiRequestError(error.statusCode, error.message, error?.error);
    }
  },
};
