import { useGetProductById, useGetProducts } from '@/api/products';
import StyledCard from '@/components/atoms/StyledCard';
import SearchBar from '@/components/atoms/StyledTextField';
import NavigationBar from '@/components/molecules/NavigationBar';
import ProductsTable from '@/components/organisms/ProductsTable';
import TopBar from '@/components/organisms/TopBar';
import REGEXES from '@/constants/regexes';
import setParams from '@/helpers/changeParams';
import { NavDirection } from '@/models/navDirection';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

const MAX_PRODUCTS_PER_PAGE = 5;

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const pageParam = searchParams.get('page');
  const idParam = searchParams.get('id');

  const [currentPage, setCurrentPage] = useState(parseInt(pageParam ?? '1'));
  const [searchPhrase, setSearchPhrase] = useState(
    idParam && REGEXES.ONLY_NUMBERS.test(idParam) ? idParam : ''
  );
  const [inputError, setInputError] = useState(false);
  const { t } = useTranslation();

  const {
    getProductsResponse: { data, total, total_pages: totalPages } = {},
    isProductsFetching,
    isProductsError,
    refetchProducts,
  } = useGetProducts(currentPage, MAX_PRODUCTS_PER_PAGE);

  const { productById, isProductFetching, isProductError, refetchProduct } =
    useGetProductById(parseInt(searchPhrase));

  const handleSearchChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (REGEXES.ONLY_NUMBERS.test(e.target.value) || e.target.value === '') {
      setInputError(false);
      if (total && parseInt(e.target.value) > total) {
        setInputError(true);
        return;
      }
      setSearchPhrase(e.target.value);
      setParams(searchParams, 'id', e.target.value);
    }
  };

  const handleNavigation = (direction: NavDirection) => {
    if (!totalPages) return;
    if (direction === NavDirection.Next && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setParams(searchParams, 'page', (currentPage + 1).toString());
    } else if (
      direction === NavDirection.Previous &&
      currentPage > 1 &&
      totalPages > 1
    ) {
      setCurrentPage((prev) => prev - 1);
      setParams(searchParams, 'page', (currentPage - 1).toString());
    }
  };

  return (
    <StyledCard>
      <TopBar />
      <SearchBar
        variant="outlined"
        label={t('search')}
        onChange={handleSearchChange}
        value={searchPhrase}
        error={inputError}
        helperText={inputError && total ? `${t('inputError')} ${total}` : ''}
      />
      <ProductsTable
        search={searchPhrase}
        products={data}
        productById={productById}
        isLoading={isProductsFetching || isProductFetching}
        isError={isProductsError || isProductError}
        onRetry={() => {
          searchPhrase ? refetchProduct() : refetchProducts();
        }}
      />
      <NavigationBar
        currentPage={currentPage}
        totalPages={totalPages}
        onNavigationClick={handleNavigation}
        disabled={!!searchPhrase || isProductsFetching || isProductFetching}
      />
    </StyledCard>
  );
}

export default App;
