import { ApiRequestError } from '../errors';
import type { Movie } from '../typings/entities/Movie';
import type { CreateMovieRequest } from '../typings/requests/CreateMovieRequest';
import type { ApiErrorResponse } from '../typings/responses/ApiErrorResponse';

export const MoviesService = {
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
};
