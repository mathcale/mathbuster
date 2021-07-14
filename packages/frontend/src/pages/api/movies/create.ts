import type { NextApiRequest, NextApiResponse } from 'next';
import type { Movie } from '../../../typings/entities/Movie';

const { API_URL } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Movie | object>) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  console.info(`api.movies.create: Adding new movie with params = ${JSON.stringify(req.body)}`);

  const response = await fetch(`${API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(req.body),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error(`api.movies.create: ${JSON.stringify(errorResponse)}`);

    res.status(response.status).json({ error: errorResponse });
    return;
  }

  const data: Movie = await response.json();
  console.info('api.movies.create: Movie created!');

  res.status(201).json(data);
}
