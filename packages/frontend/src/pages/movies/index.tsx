import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DataGrid, GridPageChangeParams } from '@material-ui/data-grid';
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
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import CloseIcon from '@material-ui/icons/Close';

import { MoviesService } from '../../services';
import { useSnackbar } from '../../hooks/useSnackbar';
import type { ListMoviesResponse } from '../../typings/responses/ListMoviesResponse';
import { ApiRequestError } from '../../errors';

const DEFAULT_PAGE_LIMIT = 10;

export default function ListMoviesPage() {
  const router = useRouter();
  const { showSnackbarMessage } = useSnackbar();

  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<ListMoviesResponse>({
    data: [],
    page: 1,
    limit: DEFAULT_PAGE_LIMIT,
    totalCount: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<ApiRequestError | null>(null);

  useEffect(() => {
    async function loadMovies() {
      setIsLoading(true);

      try {
        const pageResponse = await MoviesService.findAll(page, DEFAULT_PAGE_LIMIT);
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

    setApiError(null);

    try {
      await MoviesService.delete(id as string);

      setPage(0);
      showSnackbarMessage('Movie successfully deleted!');
    } catch (err) {
      console.error(err.message);
      setApiError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Movies :: Mathbuster</title>
      </Head>

      <Container>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          marginTop="16px"
          marginBottom="16px"
        >
          <Link href="/movies/create" passHref>
            <Button variant="outlined" size="small" startIcon={<AddIcon />}>
              Add movie
            </Button>
          </Link>
        </Box>

        <Grid container item md={12}>
          <Collapse in={apiError !== null}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setApiError(null)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>Error</AlertTitle>
              {apiError?.apiMessage
                ? (apiError?.apiMessage as string[]).map((message, i) => <p key={i}>{message}</p>)
                : apiError?.statusCode === 409
                ? 'This movie already exists!'
                : apiError?.error}
            </Alert>
          </Collapse>
        </Grid>

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
