import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { FiltersType, Product } from '../utils/types';
import { DEFAULT_FILTERS } from '../utils/consts';

interface StoreState {
  products: Product[];
  offset: number;
  requestFilters: FiltersType;
  isLoading: boolean;
  isError: boolean;
}

const initialState: StoreState = {
  products: [],
  offset: 0,
  requestFilters:  DEFAULT_FILTERS,
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
    setRequestFilters: (state, action: PayloadAction<FiltersType>) => {
      state.requestFilters = action.payload;
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
  setRequestFilters,
  setIsLoading,
  setIsError,
} = storeSlice.actions;

export const selectCount = (state: RootState) => state.store.products;

export default storeSlice.reducer;
