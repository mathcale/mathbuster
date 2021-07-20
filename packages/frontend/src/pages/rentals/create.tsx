import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/core/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import DatePicker from '@material-ui/lab/DatePicker';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useSnackbar } from '../../hooks/useSnackbar';
import { ApiRequestError } from '../../errors';
import { ListMoviesResponse } from '../../typings/responses/ListMoviesResponse';
import { ListCustomersResponse } from '../../typings/responses/ListCustomersResponse';
import { CustomersService, MoviesService, RentalsService } from '../../services';
import { CreateRentalRequest } from '../../typings/requests/CreateRentalRequest';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
  },
  form: {
    width: '100%',
  },
  textField: {
    // @ts-ignore
    marginLeft: theme.spacing(1),
    // @ts-ignore
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  formControl: {
    // @ts-ignore
    margin: theme.spacing(3),
  },
}));

export default function CreateRentalPage() {
  const classes = useStyles();
  const router = useRouter();
  const { showSnackbarMessage } = useSnackbar();

  const [movieId, setMovieId] = useState<string>('');
  const [customerId, setCustomerId] = useState<string>('');
  const [scheduledReturnDate, setScheduledReturnDate] = useState<string>('');

  const [movies, setMovies] = useState<ListMoviesResponse | null>(null);
  const [customers, setCustomers] = useState<ListCustomersResponse | null>(null);

  const [isMoviesAutocompleteOpen, setIsMoviesAutocompleteOpen] = useState<boolean>(false);
  const [isCustomersAutocompleteOpen, setIsCustomersAutocompleteOpen] = useState<boolean>(false);
  const [isMoviesLoading, setIsMoviesLoading] = useState<boolean>(false);
  const [isCustomersLoading, setIsCustomersLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<ApiRequestError | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setIsMoviesLoading(true);

      try {
        const promises = await Promise.allSettled([
          MoviesService.findAll(0, 100),
          CustomersService.findAll(0, 100),
        ]);

        // @ts-ignore
        setMovies(promises[0].value);
        // @ts-ignore
        setCustomers(promises[1].value);
      } catch (err) {
        console.error('[ERROR] CreateRentalPage.loadMovies:', err);
      } finally {
        setIsLoading(false);
        setIsMoviesLoading(false);
      }
    }

    loadData();
  }, []);

  const onFormSubmit = async (): Promise<void> => {
    setIsLoading(true);
    setApiError(null);

    try {
      const requestBody: CreateRentalRequest = {
        movieId,
        customerId,
        scheduledReturnDate,
      };

      await RentalsService.create(requestBody);
      showSnackbarMessage('Movie rented to customer!');

      router.push('/rentals');
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
        <title>Rent movie :: Mathbuster</title>
      </Head>

      <Container>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          marginTop="16px"
          marginBottom="16px"
        >
          <Link href="/rentals" passHref>
            <Button variant="outlined" size="small" startIcon={<ArrowBackIcon />}>
              Go back
            </Button>
          </Link>
        </Box>

        <Grid container>
          <Grid item md={12}>
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
                  : apiError?.error}
              </Alert>
            </Collapse>
          </Grid>

          <form noValidate autoComplete="off" className={classes.form}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Autocomplete
                  open={isMoviesAutocompleteOpen}
                  onOpen={() => {
                    setIsMoviesAutocompleteOpen(true);
                  }}
                  onClose={() => {
                    setIsMoviesAutocompleteOpen(false);
                  }}
                  onChange={(e, selectedMovie) => setMovieId(selectedMovie!.id)}
                  getOptionLabel={option => option.title}
                  options={movies?.data || []}
                  loading={isMoviesLoading}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Movie"
                      variant="standard"
                      margin="normal"
                      fullWidth
                      disabled={isLoading}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isMoviesLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item md={6}>
                <Autocomplete
                  open={isCustomersAutocompleteOpen}
                  onOpen={() => {
                    setIsCustomersAutocompleteOpen(true);
                  }}
                  onClose={() => {
                    setIsCustomersAutocompleteOpen(false);
                  }}
                  onChange={(e, selectedCustomer) => setCustomerId(selectedCustomer!.id)}
                  getOptionLabel={option => option.name}
                  options={customers?.data || []}
                  loading={isCustomersLoading}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Customer"
                      variant="standard"
                      margin="normal"
                      fullWidth
                      disabled={isLoading}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isCustomersLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item md={12}>
              <DatePicker
                disablePast
                label="Return date"
                value={scheduledReturnDate}
                onChange={newValue => {
                  if (!newValue) return;
                  setScheduledReturnDate(
                    (newValue! as unknown as Date).toISOString().split('T')[0]
                  );
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="scheduledReturnDate"
                    margin="normal"
                    variant="standard"
                    required
                    fullWidth
                    disabled={isLoading}
                  />
                )}
              />
            </Grid>

            <Button variant="contained" color="primary" onClick={onFormSubmit} disabled={isLoading}>
              Save
            </Button>
          </form>
        </Grid>
      </Container>
    </>
  );
}
