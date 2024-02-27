import { ChangeEvent, useState } from 'react';
import Input from './Input';
import { getFilteredPrice } from '../service/api';
import { useAppDispatch } from '../store/hooks';
import {
  setIsError,
  setIsLoading,
  setRequestFilters,
  setStore,
} from '../store/slice';
import { DEFAULT_FILTERS } from '../utils/consts';
import { FiltersType } from '../utils/types';
import { setDisabled } from '../utils/setDisabled';

function Filters() {
  const [filters, setFilters] = useState<FiltersType>(DEFAULT_FILTERS);
  const dispatch = useAppDispatch();

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

  const handleSetFilter = async (filters: FiltersType) => {
    dispatch(setRequestFilters(filters));
    try {
      dispatch(setIsLoading(true));
      const products = await getFilteredPrice(filters);
      dispatch(setStore(products));
      dispatch(setIsError(false));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        dispatch(setIsError(true));
        try {
          dispatch(setIsLoading(true));
          const products = await getFilteredPrice(filters);
          dispatch(setStore(products));
          dispatch(setIsError(false));
        } catch (error) {
          if (error instanceof Error) {
            dispatch(setIsError(true));
            console.log(error.message);
          }
        }
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      <form
        className="filters-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSetFilter(filters);
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
          disabled={setDisabled(DEFAULT_FILTERS, filters)}
          onClick={() => handleSetFilter(filters)}
        >
          submit
        </button>
      </form>
    </>
  );
}

export default Filters;
