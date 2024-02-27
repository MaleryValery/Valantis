type ParamsType = {
  [key: string]: string | number;
};

export const setQueryParams = (
  price: number,
  product: string,
  brand: string
) => {
  const params: ParamsType = {};

  if (price > 0) params.price = price;
  if (product) params.product = product;
  if (brand) params.brand = brand;

  return params;
};
