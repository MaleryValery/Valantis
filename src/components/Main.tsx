import { useEffect } from 'react';
import '../App.css';
import Filters from './Filters';
import { getProductsId, getProductsByIDs } from '../service/api';
import ProductList from './ProductList';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setIsError, setIsLoading, setStore } from '../store/slice';
import Pagination from './Pagination';
import Loader from './Loader';
import { DEFAULT_FILTERS } from '../utils/consts';
import { setDisabled } from '../utils/setDisabled';

function App() {
  const dispatch = useAppDispatch();
  const { offset, isLoading, isError, requestFilters } = useAppSelector((state) => state.store);

  console.log(Object.is(requestFilters, DEFAULT_FILTERS))
  useEffect(() => {
    async function getItems(): Promise<void> {
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
        }
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
          }
        }
      } finally {
        dispatch(setIsLoading(false));
      }
    }
    getItems();
  }, [offset]);

  return (
    <>
      {isLoading && <Loader />}
      <Filters />
      <ProductList />
      {setDisabled(requestFilters, DEFAULT_FILTERS) && !isError && <Pagination />}
    </>
  );
}

export default App;
