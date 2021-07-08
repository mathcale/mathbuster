import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ListMoviesPage() {
  // FIXME: use correct type
  const [data, setData] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await fetch(`/api/movies?page=${page}&limit=${limit}`);

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse);
        }

        const pageResponse = await response.json();
        setData(pageResponse);
      } catch (err) {
        console.error('[ERROR] ListMoviesPage.loadMovies:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, []);

  return (
    <>
      <Head>
        <title>Movies :: Mathbuster</title>
      </Head>

      <main>
        <h1>Movies</h1>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <table>
            <thead>
              <th>Title</th>
              <th>Overview</th>
              <th>Genres</th>
              <th>Stock Qty.</th>
              <th></th>
            </thead>

            <tbody>
              {data.totalCount > 0 ? (
                data.data.map((movie, i: number) => (
                  <tr key={i}>
                    <td>{movie.title}</td>
                    <td>{movie.overview}</td>
                    <td>{movie.genres}</td>
                    <td>{movie.availableCopies}</td>
                    <td></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No movies found!</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
