import Pagination from '@mui/material/Pagination';
import style from './pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { cardsActions } from '../../../redux/slices/cardsSlice';

export default function CatalogPagination() {
  const dispatch = useDispatch();
  const { updateCurrentPage } = cardsActions;
  const { pages, currentPage } = useSelector((state) => state.cards.filtered);
  const { status } = useSelector((state) => state.cards.default);

  const handleChange = (event, value) => {
    dispatch(updateCurrentPage(value));
  };

  const styles = {
    display: status === 'pending' ? 'none' : 'flex',
  };

  return (
    <div className={style.pagination} style={styles}>
      <Pagination count={pages} page={currentPage} color="primary" onChange={handleChange} />
    </div>
  );
}
