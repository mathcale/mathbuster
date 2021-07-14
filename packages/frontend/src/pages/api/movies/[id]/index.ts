import type { NextApiRequest, NextApiResponse } from 'next';
import type { Movie } from '../../../../typings/entities/Movie';

const { API_URL } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Movie | object>) {
  const { id } = req.query;
  console.info(`api.movies.[id].index: Fetching movie with id = "${id}"...`);

  const response = await fetch(`${API_URL}/movies/${id}`);

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error(`api.movies.index: ${JSON.stringify(errorResponse)}`);

    res.status(response.status).json({ error: errorResponse });
    return;
  }

  const data: Movie = await response.json();
  console.info('Got response from API, sending back...');

  res.status(200).json(data);
}
