import { useContext } from 'react';
import { SnackbarContext } from '../context/SnackbarProvider';

export function useSnackbar() {
  const { showSnackbar } = useContext(SnackbarContext);

  return {
    showSnackbarMessage: showSnackbar,
  };
}
