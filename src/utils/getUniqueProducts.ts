import { Product } from './types';

export const getUniqueProducts = (products: Product[]): Product[] => {
  return products.filter(
    (product, i, arr) =>
      arr.findIndex((item) => product.id === item.id) === i
  );
};
