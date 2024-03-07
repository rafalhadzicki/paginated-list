import { TextField, styled } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  width: '100%',
}));

export default StyledTextField;
