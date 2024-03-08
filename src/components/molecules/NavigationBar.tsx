import { Box, Button, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NavDirection } from '../../models/navDirection';

type NavigationBarProps = {
  onNavigationClick: (direction: NavDirection) => void;
  currentPage?: number;
  totalPages?: number;
  disabled?: boolean;
};

const NavigationBar = ({
  onNavigationClick,
  currentPage,
  totalPages,
  disabled,
}: NavigationBarProps) => {
  const { t } = useTranslation();

  const handleDisabled = (direction: NavDirection) => {
    return (
      disabled ||
      (direction === NavDirection.Next && currentPage === totalPages) ||
      (direction === NavDirection.Previous && currentPage === 1)
    );
  };
  return (
    <ButtonsContainer>
      <StyledButton
        disabled={handleDisabled(NavDirection.Previous)}
        onClick={() => onNavigationClick(NavDirection.Previous)}
      >
        {t('previous')}
      </StyledButton>
      <StyledButton
        disabled={handleDisabled(NavDirection.Next)}
        onClick={() => onNavigationClick(NavDirection.Next)}
      >
        {t('next')}
      </StyledButton>
    </ButtonsContainer>
  );
};

const ButtonsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
}));

const StyledButton = styled(Button)({
  minWidth: 100,
});

export default NavigationBar;
