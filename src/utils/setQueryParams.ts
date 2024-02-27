type ParamsType = {
  [key: string]: string | number;
};

export const setQueryParams = (
  price: number | null,
  product: string,
  brand: string
): ParamsType => {
  const params: ParamsType = {};

  if (price && price > 0) params.price = price;
  if (product) params.product = product;
  if (brand) params.brand = brand;

  return params;
};
