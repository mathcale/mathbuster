import type { NextApiRequest, NextApiResponse } from 'next';

const { API_URL } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse<void | object>) {
  if (req.method !== 'DELETE') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { id } = req.query;
  console.info(`api.movies.[id].delete: Deleting movie with id = "${id}"...`);

  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error(`api.movies.[id].delete: ${JSON.stringify(errorResponse)}`);

    res.status(response.status).json({ error: errorResponse });
    return;
  }

  console.info('api.movies.[id].delete: Movie deleted!');
  res.status(200).json({ message: 'Movie successfully deleted' });
}
