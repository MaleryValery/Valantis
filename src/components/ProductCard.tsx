import { Product } from '../utils/types';

function ProductCard({ id, product, brand, price }: Product) {
  return (
    <div className="card">
      <p>{brand}</p>
      <p>{product}</p>
      <p>
        {new Intl.NumberFormat('ru-RU', {
          maximumSignificantDigits: 2,
          style: 'currency',
          currency: 'RUB',
        }).format(price)}
      </p>
      <p>{id}</p>
    </div>
  );
}

export default ProductCard;
