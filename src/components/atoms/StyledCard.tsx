import { Card, styled } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  minWidth: '80vw',
  [theme.breakpoints.down('md')]: {
    boxShadow: 'none',
    minWidth: '90vw',
  },
  [theme.breakpoints.up('md')]: {
    minWidth: 800,
    padding: theme.spacing(6),
    boxShadow:
      '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
  },
}));

export default StyledCard;
