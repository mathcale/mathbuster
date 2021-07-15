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

import { CustomersService } from '../../services';
import type { ListCustomersResponse } from '../../typings/responses/ListCustomersResponse';

const DEFAULT_PAGE_LIMIT = 10;

export default function ListCustomersPage() {
  const router = useRouter();

  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<ListCustomersResponse>({
    data: [],
    page: 1,
    limit: DEFAULT_PAGE_LIMIT,
    totalCount: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadCustomers() {
      setIsLoading(true);

      try {
        const pageResponse = await CustomersService.findAll(page, DEFAULT_PAGE_LIMIT);
        setData(pageResponse);
      } catch (err) {
        console.error('[ERROR] ListCustomersPage.loadCustomers:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCustomers();
  }, [page]);

  const onPageChange = (params: GridPageChangeParams): void => {
    setPage(params.page);
  };

  const onEditButtonPress = (id: string) => {
    router.push(`/customers/${id}`);
  };

  return (
    <>
      <Head>
        <title>Customers :: Mathbuster</title>
      </Head>

      <Container>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography variant="h3">Customers</Typography>

          <Link href="/customers/create" passHref>
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
            { field: 'name', headerName: 'Name', sortable: false, flex: 1 },
            { field: 'age', headerName: 'Age', sortable: false, flex: 1 },
            {
              field: 'favoriteGenres',
              headerName: 'Favorite genres',
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
            { field: 'phone', headerName: 'Phone', sortable: false, flex: 1 },
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
                <IconButton onClick={() => onEditButtonPress(params.row.id)} aria-label="edit">
                  <EditIcon />
                </IconButton>
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
