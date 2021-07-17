import { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

import { AppLayout } from '../layouts';
import { SnackbarProvider } from '../context/SnackbarProvider';
import theme from '../theme';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Mathbuster</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />

          <SnackbarProvider>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
