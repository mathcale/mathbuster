import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import DatePicker from '@material-ui/lab/DatePicker';
import Grid from '@material-ui/core/Grid';
import Stack from '@material-ui/core/Stack';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { MoviesService } from '../../services';
import { useSnackbar } from '../../hooks/useSnackbar';
import { ApiRequestError } from '../../errors';
import type { CreateMovieRequest } from '../../typings/requests/CreateMovieRequest';

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

export default function CreateMoviePage() {
  const classes = useStyles();
  const router = useRouter();
  const { showSnackbarMessage } = useSnackbar();

  const [title, setTitle] = useState<string>('');
  const [overview, setOverview] = useState<string>('');
  const [genres, setGenres] = useState<string[]>([]);
  const [releaseDate, setReleaseDate] = useState<string>('');
  const [isAdult, setIsAdult] = useState<string>('');
  const [availableCopies, setAvailableCopies] = useState<number | null>(null);

  const [genre, setGenre] = useState<string>('');
  const [checkboxError, setCheckboxError] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<ApiRequestError | null>(null);

  const addGenre = (newGenre: string): void => {
    if (genres.length >= 4 || genres.find(genre => genre === newGenre)) {
      return;
    }

    setGenres([...genres, newGenre]);
    setGenre('');
  };

  const removeGenre = (genre: string): void => {
    const updatedGenres = genres.filter(g => g !== genre);
    setGenres(updatedGenres);
  };

  const onFormSubmit = async (): Promise<void> => {
    setIsLoading(true);
    setApiError(null);

    try {
      const requestBody: CreateMovieRequest = {
        title,
        overview,
        genres,
        releaseDate,
        isAdult: Boolean(isAdult),
        availableCopies: availableCopies!,
      };

      await MoviesService.create(requestBody);
      showSnackbarMessage('Movie successfully added!');

      router.push('/movies');
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
        <title>Add movie :: Mathbuster</title>
      </Head>

      <Container>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          marginTop="16px"
          marginBottom="16px"
        >
          <Link href="/movies" passHref>
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
                  : apiError?.statusCode === 409
                  ? 'This movie already exists!'
                  : apiError?.error}
              </Alert>
            </Collapse>
          </Grid>

          <form noValidate autoComplete="off" className={classes.form}>
            <Grid item md={12}>
              <TextField
                name="title"
                label="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                variant="standard"
                fullWidth
                margin="normal"
                disabled={isLoading}
              />
            </Grid>

            <Grid item md={12}>
              <TextField
                name="overview"
                label="Overview"
                multiline
                minRows={3}
                value={overview}
                onChange={e => setOverview(e.target.value)}
                required
                variant="standard"
                fullWidth
                margin="normal"
                disabled={isLoading}
              />
            </Grid>

            <Grid item md={12}>
              <TextField
                name="genres"
                label="Genres"
                value={genre}
                onChange={e => setGenre(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addGenre(genre)}
                required
                variant="standard"
                fullWidth
                margin="normal"
                disabled={isLoading}
              />

              <Stack direction="row" spacing={1}>
                {genres.map((genre, i) => (
                  <Chip
                    key={i}
                    label={genre}
                    onDelete={() => removeGenre(genre)}
                    disabled={isLoading}
                  />
                ))}
              </Stack>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={4}>
                <DatePicker
                  disableFuture
                  label="Release date"
                  value={releaseDate}
                  onChange={newValue => {
                    if (!newValue) return;
                    setReleaseDate((newValue! as unknown as Date).toISOString().split('T')[0]);
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      name="releaseDate"
                      margin="normal"
                      variant="standard"
                      required
                      fullWidth
                      disabled={isLoading}
                    />
                  )}
                />
              </Grid>

              <Grid item md={4}>
                <TextField
                  name="availableCopies"
                  label="Available copies"
                  value={availableCopies}
                  onChange={e => setAvailableCopies(+e.target.value)}
                  required
                  variant="standard"
                  margin="normal"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>

              <Grid item md={4}>
                <FormControl
                  component="fieldset"
                  error={checkboxError}
                  className={classes.formControl}
                  required
                  fullWidth
                  disabled={isLoading}
                >
                  <FormLabel component="legend">Is adult?</FormLabel>

                  <RadioGroup
                    aria-label="isAdult"
                    name="isAdult"
                    row
                    value={isAdult}
                    onChange={e => {
                      setIsAdult(e.target.value);
                      setCheckboxError(false);
                    }}
                  >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </Grid>
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
