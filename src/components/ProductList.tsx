import { useAppSelector } from '../store/hooks';
import NotFound from './NotFound';
import ProductCard from './ProductCard';

function ProductList() {
  const { products, isError } = useAppSelector((state) => state.store);

  return (
  <>
      {!isError && products.length > 0 ?
        <div className="product-container">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              price={product.price}
              brand={product.brand}
              product={product.product}
            />
          ))}
        </div>
        : <NotFound />}
      </>
  );
}

export default ProductList;
