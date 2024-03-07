import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Product } from '../../models/products';
import { TableCells } from '../../models/tableCells';
import Spinner from '../atoms/Spinner';
import ErrorAlert from '../molecules/ErrorAlert';
import ProductTableRow from '../molecules/ProductTableRow';

type ProductsTableProps = {
  search?: string;
  products?: Product[];
  productById?: Product;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
};

const ProductsTable = ({
  products,
  productById,
  search,
  isLoading,
  isError,
  onRetry,
}: ProductsTableProps) => {
  const { t } = useTranslation();

  return (
    <TableContainer>
      {isLoading && <Spinner />}

      <StyledTable>
        <TableHead>
          <StyledTableRow>
            {Object.values(TableCells).map((cell) => (
              <StyledTableCell key={cell}>{t(cell)}</StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {search
            ? productById && <ProductTableRow product={productById} />
            : products &&
              products.map((product) => (
                <ProductTableRow key={product.id} product={product} />
              ))}
        </TableBody>
      </StyledTable>
      <ErrorAlert isError={isError} onRetry={onRetry} />
    </TableContainer>
  );
};

const TableContainer = styled(Box)({
  minHeight: 322,
});

const StyledTable = styled(Table)({
  width: '100%',
});

const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
}));

export default ProductsTable;
