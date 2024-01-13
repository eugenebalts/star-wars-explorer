import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mui/material';
import { fetchCards } from '../../redux/slices/cardsSlice';
import style from './catalog.module.scss';
import { filtersActions } from '../../redux/slices/filtersSlice';
import CharacterCard from '../card/card';

export default function Catalog() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.cards.default);
  const { filteredCards, filteredCardsCount, pages } = useSelector((state) => state.cards.filtered);
  const [currentPage, setCurrentPage] = useState(1);
  const { updatePage } = filtersActions;

  useEffect(() => {
    dispatch(fetchCards());
  }, []);

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);

    dispatch(updatePage(value));
  };

  return (
    <div className={style.catalog}>
      <h3>Character cards: {filteredCardsCount}</h3>
      <div className={style.catalog__pagination}>
        <Pagination count={pages} color="primary" onChange={handlePaginationChange} />
      </div>
      <div className={style.catalog__content}>
        {status === 'pending' ? (
          <p>loading...</p>
        ) : (
          filteredCards.slice(Number(`${currentPage - 1}0`), currentPage * 10).map((card) => {
            return (
              <CharacterCard
                key={card.name}
                name={card.name}
                gender={card.gender}
                height={card.height}
                hair={card.hair_color}
                eye={card.eye_color}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
