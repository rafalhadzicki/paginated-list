import styled from '@emotion/styled';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguagePicker from '../molecules/LanguagePicker';

const TopBar = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <TopBarContainer>
      <Title variant={isMedium ? 'h6' : 'h4'}>{t('title')}</Title>
      <LanguagePicker />
    </TopBarContainer>
  );
};

const TopBarContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Title = styled(Typography)({
  fontWeight: 'bold',
});

export default TopBar;
