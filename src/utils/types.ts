export type Product = {
  brand?: null;
  id: string;
  price: number;
  product: string;
};

export type FiltersType = {
  product: string;
  price: number | null;
  brand: string;
};
