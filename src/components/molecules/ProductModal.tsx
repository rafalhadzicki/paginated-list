import { Box, Modal, ModalProps, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Product } from '../../models/products';

type ProductModalProps = { product: Product } & Omit<ModalProps, 'children'>;

const ProductModal = ({ product, ...modalProps }: ProductModalProps) => {
  const { color } = product;
  const { t } = useTranslation();
  return (
    <Modal {...modalProps}>
      <ModalCard modalBackground={color}>
        {Object.entries(product).map(([key, value]) => (
          <Typography key={key}>
            <StyledStrong>{t(key)}</StyledStrong>: {value}
          </Typography>
        ))}
      </ModalCard>
    </Modal>
  );
};

const ModalCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'modalBackground',
})<{ modalBackground: string }>(({ theme, modalBackground }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '50vw',
  backgroundColor: modalBackground,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4),
  borderRadius: 8,
  border: `2px solid ${theme.palette.grey[300]}`,
  '&:focus-visible': {
    outline: 'none',
  },
  [theme.breakpoints.up('sm')]: {
    minWidth: 400,
  },
}));

const StyledStrong = styled('strong')({
  textTransform: 'capitalize',
});

export default ProductModal;
