import axios from 'axios';
import { isAxiosError } from 'axios';
import { API_ACTIONS, API_KEY, API_URL, MAX_LIMIT } from '../utils/consts';
import { FiltersType, Product } from '../utils/types';
import { getUniqueProducts } from '../utils/getUniqueProducts';
import { setQueryParams } from '../utils/setQueryParams';

const axiosRequest = axios.create({
  baseURL: API_URL,
  headers: { 'X-Auth': API_KEY },
});

export async function getProductsId(offset: number): Promise<string[]> {
  const body = {
    action: API_ACTIONS.getIDs,
    params: { offset: offset, limit: MAX_LIMIT },
  };

  try {
    const response = await axiosRequest.post('', body);
    const products: string[] = response.data.result;
    return products;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(`Api: ${error.message}`);
    } else {
      throw new Error('Nothing was found');
    }
  }
}

export async function getProductsByIDs(ids: string[]): Promise<Product[]> {
  const body = {
    action: API_ACTIONS.getItems,
    params: { ids: ids },
  };

  try {
    const response = await axiosRequest.post('', body);
    const products: Product[] = response.data.result;
    const uniqueIndex = getUniqueProducts(products);
    return uniqueIndex;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(`Api: ${error.message}`);
    } else {
      throw new Error('Nothing was found');
    }
  }
}

export async function getFilteredPrice({
  price,
  product,
  brand} : FiltersType
): Promise<Product[]> {
  const queryParams = setQueryParams(price, product, brand);
  const body = {
    action: API_ACTIONS.filter,
    params: queryParams,
  };

  try {
    const response = await axiosRequest.post('', body);
    const products: string[] = response.data.result;
    const finalItems = await getProductsByIDs(products);
    return finalItems;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(`Api: ${error.message}`);
    } else {
      throw new Error('Nothing was found');
    }
  }
}
