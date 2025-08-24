import { useCallback } from 'react';
import { useToastContext } from '../context/ToastContext';

const useHandleErrors = () => {
  const { show: showToast } = useToastContext();

  const showErrorMessage = useCallback(
    (error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      showToast(message, {
        type: 'error',
      });
    },
    [showToast],
  );

  return {
    showErrorMessage,
  };
};

export default useHandleErrors;
