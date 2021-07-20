import type { NextApiRequest, NextApiResponse } from 'next';
import type { Rental } from '../../../typings/entities/Rental';

const { API_URL } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Rental | object>) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  console.info(`api.rentals.create: Adding new movie with params = ${JSON.stringify(req.body)}`);

  const response = await fetch(`${API_URL}/rentals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(req.body),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error(`api.rentals.create: ${JSON.stringify(errorResponse)}`);

    res.status(response.status).json({ error: errorResponse });
    return;
  }

  const data: Rental = await response.json();
  console.info('api.rentals.create: Rental created!');

  res.status(201).json(data);
}
