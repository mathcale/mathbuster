import { createContext, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/core/Alert';

interface SnackbarContextProps {
  showSnackbar: (message: any) => void;
}

export const SnackbarContext = createContext<SnackbarContextProps>({ showSnackbar: () => null });

export function SnackbarProvider({ children }: { children: JSX.Element }) {
  const [snackbars, setSnackbars] = useState<any[]>([]);

  const showSnackbar = (message: any) => setSnackbars([...snackbars, message]);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {snackbars.map((message, i) => (
        <Snackbar
          key={i}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={3000}
          open={Boolean(message)}
          onClose={() => setSnackbars([...snackbars.slice(0, i), '', ...snackbars.slice(i + 1)])}
        >
          <Alert
            onClose={() => () =>
              setSnackbars([...snackbars.slice(0, i), '', ...snackbars.slice(i + 1)])}
            severity="success"
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      ))}

      {children}
    </SnackbarContext.Provider>
  );
}
