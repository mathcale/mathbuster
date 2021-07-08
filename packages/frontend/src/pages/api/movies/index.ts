import type { NextApiRequest, NextApiResponse } from 'next';

const { API_URL } = process.env;
const allowedPaginationLimits = [10, 25, 50];

// FIXME: use correct type instead of `any`
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const page = req.query.page && +req.query.page > 0 ? req.query.page : 1;
  const limit =
    req.query.limit && +req.query.limit in allowedPaginationLimits ? req.query.limit : 10;

  console.info(`api.movies.index: Fetching movies, page: ${page} / limit: ${limit}`);

  const response = await fetch(`${API_URL}/movies?page=${page}&limit=${limit}`);

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error(`api.movies.index: ${JSON.stringify(errorResponse)}`);

    res.status(response.status).json({ error: errorResponse });

    return;
  }

  const data = await response.json();
  console.info('Got response from API, sending back...');

  res.status(200).json(data);
}
