import { Alert, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

type ErrorAlertProps = {
  isError?: boolean;
  onRetry?: () => void;
};

const ErrorAlert = ({ isError, onRetry }: ErrorAlertProps) => {
  const { t } = useTranslation();
  return (
    <>
      {isError && (
        <Alert
          variant="filled"
          severity="error"
          action={
            onRetry && (
              <Button color="inherit" size="small" onClick={onRetry}>
                {t('retry')}
              </Button>
            )
          }
        >
          {t('error')}
        </Alert>
      )}
    </>
  );
};

export default ErrorAlert;
