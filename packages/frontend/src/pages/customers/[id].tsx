import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import Grid from '@material-ui/core/Grid';
import Stack from '@material-ui/core/Stack';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Collapse from '@material-ui/core/Collapse';

import { CustomersService } from '../../services';
import { useSnackbar } from '../../hooks/useSnackbar';
import { ApiRequestError } from '../../errors';
import type { EditCustomerRequest } from '../../typings/requests/EditCustomerRequest';

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
    marginTop: theme.spacing(2),
    // @ts-ignore
    marginBottom: theme.spacing(1),
  },
}));

export default function CreateCustomerPage() {
  const classes = useStyles();
  const router = useRouter();
  const { showSnackbarMessage } = useSnackbar();

  const { id } = router.query;

  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);
  const [address, setAddress] = useState<string>('');
  const [complement, setComplement] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [enabled, setEnabled] = useState<string>('');

  const [genre, setGenre] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<ApiRequestError | null>(null);

  useEffect(() => {
    async function loadCustomer() {
      try {
        const response = await CustomersService.findOne(id as string);

        setName(response.name);
        setAge(response.age);
        setEmail(response.email || '');
        setPhone(response.phone);
        setFavoriteGenres(response.favoriteGenres || []);
        setAddress(response.address);
        setComplement(response.complement || '');
        setNumber(response.number);
        setNeighborhood(response.neighborhood);
        setCity(response.city);
        setZipCode(response.zipCode);
        setState(response.state);
        setCountry(response.country);
        setEnabled(response.enabled.toString());
      } catch (err) {
        console.error(err.message);
        setApiError(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCustomer();
  }, []);

  const addGenre = (newGenre: string): void => {
    if (favoriteGenres.length >= 4 || favoriteGenres.find(genre => genre === newGenre)) {
      return;
    }

    setFavoriteGenres([...favoriteGenres, newGenre]);
    setGenre('');
  };

  const removeGenre = (genre: string): void => {
    const updatedGenres = favoriteGenres.filter(g => g !== genre);
    setFavoriteGenres(updatedGenres);
  };

  const onFormSubmit = async (): Promise<void> => {
    setIsLoading(true);
    setApiError(null);

    try {
      const requestBody: EditCustomerRequest = {
        name,
        age,
        email,
        phone,
        favoriteGenres,
        address,
        complement,
        number,
        neighborhood,
        city,
        zipCode,
        state,
        country,
        enabled: enabled === 'true',
      };

      await CustomersService.update(id as string, requestBody);
      showSnackbarMessage('Customer successfully updated!');

      router.push('/customers');
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
        <title>Edit customer :: Mathbuster</title>
      </Head>

      <Container>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          marginTop="16px"
          marginBottom="16px"
        >
          <Link href="/customers" passHref>
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
                {apiError?.apiMessage ? apiError?.apiMessage : apiError?.error}
              </Alert>
            </Collapse>
          </Grid>

          <form noValidate autoComplete="off" className={classes.form}>
            <Grid container spacing={2}>
              <Grid item md={3}>
                <TextField
                  name="name"
                  label="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  variant="standard"
                  fullWidth
                  margin="normal"
                  disabled={isLoading}
                />
              </Grid>

              <Grid item md={3}>
                <TextField
                  name="age"
                  label="Age"
                  value={age}
                  onChange={e => setAge(+e.target.value)}
                  required
                  variant="standard"
                  fullWidth
                  margin="normal"
                  disabled={isLoading}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
              </Grid>

              <Grid item md={3}>
                <TextField
                  name="phone"
                  label="Phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  variant="standard"
                  fullWidth
                  margin="normal"
                  disabled={isLoading}
                />
              </Grid>

              <Grid item md={3}>
                <TextField
                  name="email"
                  label="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  variant="standard"
                  fullWidth
                  margin="normal"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid item md={12}>
              <TextField
                name="favoriteGenres"
                label="Favorite genres"
                value={genre}
                onChange={e => setGenre(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addGenre(genre)}
                required
                variant="standard"
                fullWidth
                margin="normal"
                disabled={isLoading}
                helperText="Type a genre and press Enter to add"
              />

              <Stack direction="row" spacing={1}>
                {favoriteGenres.map((genre, i) => (
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
              <Grid item md={6}>
                <TextField
                  name="address"
                  label="Address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                  variant="standard"
                  margin="normal"
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>

              <Grid item md={4}>
                <TextField
                  name="complement"
                  label="Complement"
                  value={complement}
                  onChange={e => setComplement(e.target.value)}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>

              <Grid item md={2}>
                <TextField
                  name="number"
                  label="Number"
                  value={number}
                  onChange={e => setNumber(e.target.value)}
                  required
                  variant="standard"
                  margin="normal"
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={3}>
                <TextField
                  name="neighborhood"
                  label="Neighborhood"
                  value={neighborhood}
                  onChange={e => setNeighborhood(e.target.value)}
                  required
                  variant="standard"
                  margin="normal"
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>

              <Grid item md={3}>
                <TextField
                  name="city"
                  label="City"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>

              <Grid item md={2}>
                <TextField
                  name="zipCode"
                  label="Zip code"
                  value={zipCode}
                  onChange={e => setZipCode(e.target.value)}
                  required
                  variant="standard"
                  margin="normal"
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>

              <Grid item md={2}>
                <TextField
                  name="state"
                  label="State"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  required
                  variant="standard"
                  margin="normal"
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>

              <Grid item md={2}>
                <TextField
                  name="country"
                  label="Country"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  required
                  variant="standard"
                  margin="normal"
                  fullWidth
                  disabled={isLoading}
                  inputProps={{ minLength: 3, maxLength: 3 }}
                />
              </Grid>
            </Grid>

            <Grid container item md={12}>
              <FormControl
                component="fieldset"
                className={classes.formControl}
                required
                fullWidth
                disabled={isLoading}
              >
                <FormLabel component="legend">Enabled</FormLabel>

                <RadioGroup
                  aria-label="enabled"
                  name="enabled"
                  row
                  value={enabled}
                  onChange={e => {
                    setEnabled(e.target.value);
                  }}
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
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
