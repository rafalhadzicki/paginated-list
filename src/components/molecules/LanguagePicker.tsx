import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  styled,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '../../constants/languages';

const LanguagePicker = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
    setSelectedLanguage(event.target.value);
  };

  return (
    <Select value={selectedLanguage} onChange={handleChangeLanguage}>
      {Object.keys(languages).map((key, index) => (
        <MenuItem key={index} value={key}>
          <MenuItemsContainer>
            <img src={languages[key].flag} alt={languages[key].name} />
            <Typography>{languages[key].name}</Typography>
          </MenuItemsContainer>
        </MenuItem>
      ))}
    </Select>
  );
};

const MenuItemsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export default LanguagePicker;
