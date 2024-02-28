import { ChangeEvent, useState } from 'react';
import Input from './Input';
import { getFilteredPrice } from '../service/api';
import { useAppDispatch } from '../store/hooks';
import {
  setCustomOffset,
  setIsError,
  setIsLoading,
  setProductsPagination,
  setRequestFilters,
  setStore,
} from '../store/slice';
import { DEFAULT_FILTERS } from '../utils/consts';
import { FiltersType } from '../utils/types';
import { isObjectsEqual } from '../utils/isObjectsEqual';

function Filters() {
  const [filters, setFilters] = useState<FiltersType>(DEFAULT_FILTERS);
  const dispatch = useAppDispatch();

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    dispatch(setRequestFilters(DEFAULT_FILTERS));
  };

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isKey = Object.keys(DEFAULT_FILTERS).includes(name);

    if (name === 'price' && Number(value) < 0) {
      return;
    }

    if (isKey) {
      const newValue = name === 'price' ? Number(value) : value;
      setFilters(() => ({
        product: '',
        price: 0,
        brand: '',
        [name]: newValue,
      }));
    }
  };

  const fetchData = async () => {
    try {
      dispatch(setIsLoading(true));
      const products = await getFilteredPrice(filters);
      const firstPage = products.slice(
        0,
        products.length > 50 ? 50 : products.length
      );
      dispatch(setStore(products));
      dispatch(setProductsPagination(firstPage));
      dispatch(setCustomOffset(50));
      dispatch(setIsError(false));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        dispatch(setIsError(true));
        getFilteredProducts(filters);
        throw new Error('error');
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const getFilteredProducts = async (filters: FiltersType) => {
    dispatch(setRequestFilters(filters));
    try {
      await fetchData();
    } catch (error) {
      await fetchData();
    }
  };

  return (
    <>
      <form
        className="filters-container"
        onSubmit={(e) => {
          e.preventDefault();
          getFilteredProducts(filters);
        }}
      >
        <Input
          label="product"
          inputType="text"
          onChange={handlerChange}
          value={filters.product}
        />
        <Input
          label="price"
          inputType="number"
          onChange={handlerChange}
          value={filters.price ? filters.price : null}
        />
        <Input
          label="brand"
          inputType="text"
          onChange={handlerChange}
          value={filters.brand}
        />
        <button
          disabled={isObjectsEqual(DEFAULT_FILTERS, filters)}
          onClick={() => getFilteredProducts(filters)}
        >
          submit
        </button>
        <button
          disabled={isObjectsEqual(DEFAULT_FILTERS, filters)}
          onClick={resetFilters}
        >
          reset
        </button>
      </form>
    </>
  );
}

export default Filters;
