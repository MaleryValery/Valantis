import { useAppSelector } from '../store/hooks';
import { DEFAULT_FILTERS } from '../utils/consts';
import { isObjectsEqual } from '../utils/isObjectsEqual';
import NotFound from './NotFound';
import ProductCard from './ProductCard';

function ProductList() {
  const { products, isError, requestFilters, productsPagination } =
    useAppSelector((state) => state.store);

  const notFitered = isObjectsEqual(requestFilters, DEFAULT_FILTERS);

  const renderedProducts = notFitered ? products : productsPagination;

  return (
    <>
      {!isError && products.length > 0 ? (
        <div className="product-container">
          {renderedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              price={product.price}
              brand={product.brand}
              product={product.product}
            />
          ))}
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default ProductList;
