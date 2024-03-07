import { TableCell, TableRow, styled } from '@mui/material';
import { useState } from 'react';
import { Product } from '../../models/products';
import ProductModal from './ProductModal';

const ProductTableRow = ({ product }: { product: Product }) => {
  const { id, name, year, color } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <StyledTableRow
        onClick={() => {
          setIsModalOpen(true);
        }}
        rowColor={color}
      >
        <TableCell>{id}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{year}</TableCell>
      </StyledTableRow>
      <ProductModal
        product={product}
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== 'rowColor',
})<{ rowColor: string }>(({ rowColor }) => ({
  backgroundColor: rowColor,

  cursor: 'pointer',
  '&:hover': {
    opacity: 0.7,
  },
  '&.MuiTableRow-root': { maxHeight: 53 },
}));

export default ProductTableRow;
