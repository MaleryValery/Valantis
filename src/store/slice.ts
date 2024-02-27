import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Product } from '../utils/types';

interface StoreState {
  products: Product[];
  offset: number;
  brand: string;
  price: number | null;
  product: string;
  isLoading: boolean;
  isError: boolean;
}

const initialState: StoreState = {
  products: [],
  offset: 0,
  brand: '',
  price: null,
  product: '',
  isLoading: false,
  isError: false,
};

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setStore: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setBrand: (state, action: PayloadAction<string>) => {
      state.brand = action.payload;
    },
    setProduct: (state, action: PayloadAction<string>) => {
      state.product = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },
});

export const {
  setStore,
  setOffset,
  setBrand,
  setProduct,
  setPrice,
  setIsLoading,
  setIsError,
} = storeSlice.actions;

export const selectCount = (state: RootState) => state.store.products;

export default storeSlice.reducer;
