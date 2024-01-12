import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mui/material';
import { fetchCards } from '../../redux/slices/cardsSlice';
import style from './catalog.module.scss';
import { filtersActions } from '../../redux/slices/filtersSlice';

export default function Catalog() {
  const dispatch = useDispatch();
  const { cards, cardsCount, pages, status } = useSelector((state) => state.cards.default);
  // const { filteredCards, filteredCardsCount } = useSelector((state) => state.cards.filtered);
  const { page, search } = useSelector((state) => state.filters);
  const [currentPage, setCurrentPage] = useState(1);
  const { updatePage } = filtersActions;

  useEffect(() => {
    dispatch(
      fetchCards({
        page,
        search,
      })
    );
  }, [search, page]);

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
    console.log(currentPage);

    dispatch(updatePage(value));
  };

  return (
    <div className={style.catalog}>
      <h3>Character cards: {cardsCount}</h3>
      <div className={style.catalog__content}>
        {status === 'pending' ? (
          <p>loading...</p>
        ) : (
          cards.map((card) => {
            return (
              <div>
                <p>{card.name}</p>
              </div>
            );
          })
        )}
      </div>
      <div className={style.catalog__pagination}>
        <Pagination count={pages} color="primary" onChange={handlePaginationChange} />
      </div>
    </div>
  );
}
