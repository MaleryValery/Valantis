import { md5 } from 'js-md5';

const currDate = new Date();
const getCurrMonth = (currDate.getMonth() + 1).toString().padStart(2, '0');
const TS = `${currDate.getFullYear()}${getCurrMonth}${currDate.getDate()}`;

export const DEFAULT_FILTERS = {
  product: '',
  price: 0,
  brand: '',
};

export const API_ACTIONS = {
  getIDs: 'get_ids',
  filter: 'filter',
  getItems: 'get_items',
  getFields: 'get_fields',
};
export const API_PARAMS = {
  price: 'price',
  field: 'field',
  product: 'product',
  brand: 'brand',
};
export const MAX_LIMIT = 50;
export const API_URL = 'https://api.valantis.store:41000/';
export const API_KEY = md5(`${import.meta.env.VITE_API_PASSWORD}_${TS}`);
