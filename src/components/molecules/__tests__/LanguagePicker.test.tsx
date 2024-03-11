import { languages } from '@/constants/languages';
import { fireEvent, render } from '@testing-library/react';

import LanguagePicker from '../LanguagePicker';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(
        (language: string) => new Promise((resolve) => resolve(language))
      ),
    },
  }),
}));

describe('LanguagePicker', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<LanguagePicker />);
    expect(getByRole('combobox')).toBeInTheDocument();
  });

  it('should display all languages after expanding', () => {
    const { getByRole, getAllByRole } = render(<LanguagePicker />);
    fireEvent.mouseDown(getByRole('combobox'));
    const options = getAllByRole('option');
    Object.keys(languages).forEach((key, index) => {
      expect(options[index].getAttribute('data-value')).toBe(key);
    });
  });

  it('should change language after selecting a new one', () => {
    const { getByRole, getAllByRole } = render(<LanguagePicker />);
    const picker = getByRole('combobox');
    fireEvent.mouseDown(picker);
    const options = getAllByRole('option');
    fireEvent.click(options[1]);
    const key = options[1].getAttribute('data-value');
    expect(picker).toHaveTextContent(languages[key || 'pl'].name);
  });
});
