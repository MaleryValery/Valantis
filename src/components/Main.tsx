import { useCallback, useEffect } from 'react';
import Loader from './Loader';
import Filters from './Filters';
import Pagination from './Pagination';
import ProductList from './ProductList';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setIsError, setIsLoading, setStore } from '../store/slice';
import { getProductsId, getProductsByIDs } from '../service/api';

function App() {
  const dispatch = useAppDispatch();
  const { offset, isLoading, isError, requestFilters } = useAppSelector(
    (state) => state.store
  );

  const fetchData = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const productsId = await getProductsId(offset);
      const productList = await getProductsByIDs(productsId);
      dispatch(setStore(productList));
      dispatch(setIsError(false));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        dispatch(setIsError(true));
        throw new Error('error');
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [offset]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        await fetchData();
      } catch {
        await fetchData();
      }
    };
    getProducts();
  }, [offset, requestFilters]);

  return (
    <>
      {isLoading && <Loader />}
      <Filters />
      {!isError && <Pagination />}
      <ProductList />
    </>
  );
}

export default App;
