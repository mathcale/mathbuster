import type { NextApiRequest, NextApiResponse } from 'next';
import type { Customer } from '../../../../typings/entities/Customer';

const { API_URL } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Customer | object>
) {
  const { id } = req.query;
  console.info(`api.customers.[id].index: Fetching customer with id = "${id}"...`);

  const response = await fetch(`${API_URL}/customers/${id}`);

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error(`api.customers.index: ${JSON.stringify(errorResponse)}`);

    res.status(response.status).json({ error: errorResponse });
    return;
  }

  const data: Customer = await response.json();
  console.info('Got response from API, sending back...');

  res.status(200).json(data);
}
