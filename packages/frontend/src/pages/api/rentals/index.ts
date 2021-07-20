import type { NextApiRequest, NextApiResponse } from 'next';
import type { ListRentalsResponse } from '../../../typings/responses/ListRentalsResponse';

const { API_URL } = process.env;
const allowedPaginationLimits = [10, 25, 50, 75, 100];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListRentalsResponse | object>
) {
  const page = req.query.page && +req.query.page > 0 ? req.query.page : 1;
  const limit =
    req.query.limit && allowedPaginationLimits.find(limit => +req.query.limit === limit)
      ? req.query.limit
      : 10;

  console.info(`api.rentals.index: Fetching rentals, page: ${page} / limit: ${limit}`);

  const response = await fetch(`${API_URL}/rentals?page=${page}&limit=${limit}`);

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error(`api.rentals.index: ${JSON.stringify(errorResponse)}`);

    res.status(response.status).json({ error: errorResponse });

    return;
  }

  const data: ListRentalsResponse = await response.json();
  console.info('Got response from API, sending back...');

  res.status(200).json(data);
}
