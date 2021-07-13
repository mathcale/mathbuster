import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function CreateMoviePage() {
  return (
    <>
      <Head>
        <title>Add movie :: Mathbuster</title>
      </Head>

      <Container>
        <Typography variant="h3">Create movie</Typography>
      </Container>
    </>
  );
}
