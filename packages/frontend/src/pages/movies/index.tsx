import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DataGrid, GridPageChangeParams } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Stack from '@material-ui/core/Stack';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { green, red } from '@material-ui/core/colors';

import type { ListMoviesResponse } from '../../typings/responses/ListMoviesResponse';

export default function ListMoviesPage() {
  const router = useRouter();

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

  const onEditButtonPress = (id: string) => {
    router.push(`/movies/${id}`);
  };

  const onDeleteButtonPress = async (id: string, title: string) => {
    const canDelete = confirm(`Are you sure you want to delete "${title}"?`);

    if (!canDelete) {
      return false;
    }

    // TODO: implement
  };

  return (
    <>
      <Head>
        <title>Movies :: Mathbuster</title>
      </Head>

      <Container>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography variant="h3">Movies</Typography>

          <Link href="/movies/create" passHref>
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddIcon />}
              style={{ marginTop: 5, marginLeft: 10 }}
            >
              Add
            </Button>
          </Link>
        </Box>

        <DataGrid
          rows={data!.data}
          columns={[
            { field: 'title', headerName: 'Title', sortable: false, flex: 1 },
            {
              field: 'genres',
              headerName: 'Genres',
              sortable: false,
              flex: 1,
              /* eslint-disable react/display-name */
              renderCell: params => (
                <Stack direction="row" spacing={1}>
                  {(params.value! as string[]).map((genre, i) => (
                    <Chip key={i} size="small" label={genre} />
                  ))}
                </Stack>
              ),
            },
            { field: 'availableCopies', headerName: 'Available copies', sortable: false, flex: 1 },
            {
              field: 'enabled',
              headerName: 'Enabled',
              sortable: false,
              flex: 1,
              renderCell: params =>
                params.value ? (
                  <Chip
                    size="small"
                    label="Yes"
                    icon={<CheckIcon style={{ color: green[300] }} />}
                  />
                ) : (
                  <Chip size="small" label="No" icon={<CancelIcon style={{ color: red[300] }} />} />
                ),
            },
            {
              field: 'actions',
              headerName: 'Actions',
              sortable: false,
              flex: 1,
              /* eslint-disable react/display-name */
              renderCell: params => (
                <>
                  <IconButton onClick={() => onEditButtonPress(params.row.id)} aria-label="edit">
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => onDeleteButtonPress(params.row.id, params.row.title)}
                    aria-label="delete"
                  >
                    <DeleteIcon style={{ color: red[300] }} />
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
          disableSelectionOnClick
          disableColumnFilter
          disableColumnMenu
        />
      </Container>
    </>
  );
}
