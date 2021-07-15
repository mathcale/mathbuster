import type { NextApiRequest, NextApiResponse } from 'next';
import type { ListCustomersResponse } from '../../../typings/responses/ListCustomersResponse';

const { API_URL } = process.env;
const allowedPaginationLimits = [10, 25, 50];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListCustomersResponse | object>
) {
  const page = req.query.page && +req.query.page > 0 ? req.query.page : 1;
  const limit =
    req.query.limit && +req.query.limit in allowedPaginationLimits ? req.query.limit : 10;

  console.info(`api.customers.index: Fetching customers, page: ${page} / limit: ${limit}`);

  const response = await fetch(`${API_URL}/customers?page=${page}&limit=${limit}`);

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error(`api.customers.index: ${JSON.stringify(errorResponse)}`);

    res.status(response.status).json({ error: errorResponse });

    return;
  }

  const data: ListCustomersResponse = await response.json();
  console.info('Got response from API, sending back...');

  res.status(200).json(data);
}
