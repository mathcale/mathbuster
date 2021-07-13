import { useState, useEffect } from 'react';
import Head from 'next/head';
import { DataGrid, GridPageChangeParams } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import type { ListMoviesResponse } from '../../typings/responses/ListMoviesResponse';

export default function ListMoviesPage() {
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<ListMoviesResponse>({
    data: [],
    page: 1,
    limit: 10,
    totalCount: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadMovies() {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/movies?page=${page + 1}&limit=10`);

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
  }, [page]);

  const onPageChange = (params: GridPageChangeParams): void => {
    setPage(params.page);
  };

  return (
    <>
      <Head>
        <title>Movies :: Mathbuster</title>
      </Head>

      <Container>
        <Typography variant="h3">Movies</Typography>

        <DataGrid
          rows={data!.data}
          columns={[
            { field: 'title', headerName: 'Title', flex: 1 },
            { field: 'genres', headerName: 'Genres', flex: 1 },
            { field: 'availableCopies', headerName: 'Available copies', flex: 1 },
            {
              field: 'actions',
              headerName: 'Actions',
              flex: 1,
              renderCell: params => (
                <>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>

                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </>
              ),
            },
          ]}
          pagination
          autoHeight
          page={page}
          pageSize={data!.limit}
          rowCount={data!.totalCount}
          paginationMode="server"
          onPageChange={onPageChange}
          loading={isLoading}
        />
      </Container>
    </>
  );
}
