import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>

      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>

      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function ListMoviesPage() {
  // FIXME: use correct type
  const [data, setData] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const classes = useStyles2();

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

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

      <Container>
        <h1>Movies</h1>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="custom pagination table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ minWidth: 170 }}>
                      Title
                    </TableCell>

                    <TableCell align="center" style={{ minWidth: 170 }}>
                      Genres
                    </TableCell>

                    <TableCell align="center" style={{ minWidth: 170 }}>
                      Available copies
                    </TableCell>

                    <TableCell align="center" style={{ minWidth: 170 }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data.data.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>

                      <TableCell style={{ width: 160 }} align="center">
                        {row.genres.length > 0
                          ? row.genres.map(genre => <Chip key={genre} label={genre} size="small" />)
                          : '-'}
                      </TableCell>

                      <TableCell style={{ width: 160 }} align="center">
                        {row.availableCopies}
                      </TableCell>

                      <TableCell style={{ width: 160 }} align="center">
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>

                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                  {data.totalCount === 0 && (
                    <TableRow style={{ height: 53 * 1 }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[10]}
                      colSpan={4}
                      count={data.totalCount}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
    </>
  );
}
