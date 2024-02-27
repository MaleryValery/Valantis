import { useEffect } from 'react';
import '../App.css';
import Filters from './Filters';
import { getProductsId, getProductsByIDs } from '../service/api';
import ProductList from './ProductList';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setIsError, setIsLoading, setStore } from '../store/slice';
import Pagination from './Pagination';
import Loader from './Loader';

function App() {
  const dispatch = useAppDispatch();
  const { offset, brand, product, price, isLoading, isError } = useAppSelector(
    (state) => state.store
  );

  useEffect(() => {
    async function getItems() {
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
    if (!brand && !product && !price) {
      getItems();
    }
  }, [offset, brand, product, price]);

  return (
    <>
      {isLoading && <Loader />}
      <Filters />
      <ProductList />
      {!!!brand && !!!product && !!!price && !isError && <Pagination />}
    </>
  );
}

export default App;
