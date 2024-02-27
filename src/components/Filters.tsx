import { ChangeEvent, useState } from 'react';
import Input from './Input';
import { getFilteredPrice } from '../service/api';
import { useAppDispatch } from '../store/hooks';
import {
  setBrand,
  setIsError,
  setIsLoading,
  setPrice,
  setProduct,
  setStore,
} from '../store/slice';

function Filters() {
  const [nameValue, setNameValue] = useState('');
  const [brandValue, setBrandValue] = useState('');
  const [priceValue, setPriceValue] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const handlerChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);
    if (price && price <= 0) {
      setPriceValue(null);
      return;
    }
    setPriceValue(price);
    setNameValue('');
    setBrandValue('');
  };

  const handleSetFilter = async (
    price: number,
    product: string,
    brand: string
  ) => {
    dispatch(setPrice(price));
    dispatch(setProduct(product));
    dispatch(setBrand(brand));
    try {
      dispatch(setIsLoading(true));
      const products = await getFilteredPrice(price, product, brand);
      // const products = await getFields();
      console.log('products: ', products);
      dispatch(setStore(products));
      dispatch(setIsError(false));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        dispatch(setIsError(true));
        try {
          dispatch(setIsLoading(true));
          const products = await getFilteredPrice(price, product, brand);
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
      <div className="filters-container">
        <Input
          label="Product"
          inputType="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNameValue(e.target.value);
            setPriceValue(null);
            setBrandValue('');
          }}
          value={nameValue}
        />
        <Input
          label="Price"
          inputType="number"
          onChange={handlerChangePrice}
          value={priceValue ? priceValue : null}
        />
        <Input
          label="brand"
          inputType="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setBrandValue(e.target.value);
            setPriceValue(null);
            setNameValue('');
          }}
          value={brandValue}
        />
        <button
          disabled={!!!nameValue && !!!priceValue && !!!brandValue}
          onClick={() =>
            handleSetFilter(priceValue || 0, nameValue, brandValue)
          }
        >
          submit
        </button>
      </div>
    </>
  );
}

export default Filters;
