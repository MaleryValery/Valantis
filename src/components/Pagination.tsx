import { useAppDispatch, useAppSelector } from '../store/hooks';
import { isObjectsEqual } from '../utils/isObjectsEqual';
import { DEFAULT_FILTERS } from '../utils/consts';
import {
  setCustomOffset,
  setOffset,
  setProductsPagination,
} from '../store/slice';

function Pagination() {
  const dispatch = useAppDispatch();
  const { offset, requestFilters, products, customOffset, productsPagination } =
    useAppSelector((state) => state.store);

  const numbersProduct = products.length;
  const numbersCurrentList = productsPagination.length;
  const isFitered = !isObjectsEqual(requestFilters, DEFAULT_FILTERS);

  const handleClickPrev = () => {
    if (!isFitered) {
      if (offset === 0) return;
      dispatch(setOffset(offset - 50));
    } else {
      if (customOffset === 0) return;
      const prevPage = customOffset - numbersCurrentList - 50;
      dispatch(setCustomOffset(customOffset - numbersCurrentList));
      const newProductsList = products.slice(
        prevPage,
        customOffset - numbersCurrentList
      );
      dispatch(setProductsPagination(newProductsList));
    }
  };

  const handleClickNext = () => {
    if (!isFitered) {
      dispatch(setOffset(offset + 50));
    } else {
      const nextPage =
        (products.length - customOffset) / 50 >= 1
          ? customOffset + 50
          : products.length;
      const newProductsList = products.slice(customOffset, nextPage);

      dispatch(setProductsPagination(newProductsList));
      dispatch(setCustomOffset(nextPage));
    }
  };

  const getCurrentPage = () => {
    if (!isFitered) {
      return offset === 0 ? 1 : Math.ceil(offset / 50) + 1;
    } else {
      return customOffset === 0 ? 1 : Math.ceil(customOffset / 50);
    }
  };

  const currPage = getCurrentPage();

  return (
    <div className="pagination-container">
      <button
        disabled={!isFitered ? offset === 0 : customOffset === 50}
        onClick={handleClickPrev}
        className="pagination-btn"
      >
        ←
      </button>
      <span>{currPage}</span>
      <button
        disabled={
          !isFitered
            ? numbersProduct * currPage < offset
            : numbersProduct <= customOffset
        }
        onClick={handleClickNext}
        className="pagination-btn"
      >
        →
      </button>
    </div>
  );
}

export default Pagination;
