import { ApiRequestError } from '../errors';
import type { Movie } from '../typings/entities/Movie';
import type { CreateMovieRequest } from '../typings/requests/CreateMovieRequest';
import type { ApiErrorResponse } from '../typings/responses/ApiErrorResponse';

export const MoviesService = {
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
