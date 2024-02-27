import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setOffset } from "../store/slice";

function Pagination() {
  const dispatch = useAppDispatch();
  const { offset } = useAppSelector((state) => state.store)
  
  const handleClickPrev = () => {
    if (offset === 0) return;
    dispatch(setOffset(offset - 50))
  };

  const handleClickNext = () => {
    dispatch(setOffset(offset + 50))
  };

  const currPage = offset === 0 ?  1 :  Math.ceil(offset / 50) + 1

  return (
    <div className="pagination-container">
      <button disabled={offset === 0}
        onClick={handleClickPrev}
        className="pagination-btn">←</button>
      <span>{currPage}</span>
      <button  onClick={handleClickNext} className="pagination-btn">→</button>
    </div>
  );
}

export default Pagination;
