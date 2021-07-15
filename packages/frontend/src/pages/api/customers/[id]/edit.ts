import type { NextApiRequest, NextApiResponse } from 'next';

const { API_URL } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse<void | object>) {
  if (req.method !== 'PATCH') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { id } = req.query;
  console.info(`api.customers.[id].edit: Updating customer with id = "${id}"...`);

  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error(`api.customers.[id].edit: ${JSON.stringify(errorResponse)}`);

    res.status(response.status).json({ error: errorResponse });
    return;
  }

  console.info('api.customers.[id].edit: Customer edited!');
  res.status(200).json({ message: 'Customer successfully edited' });
}
