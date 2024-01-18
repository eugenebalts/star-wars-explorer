import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { cardsActions, fetchCards } from '../../redux/slices/cardsSlice';
import { filtersActions } from '../../redux/slices/filtersSlice';
import style from './catalog.module.scss';
import CatalogList from './catalog-list/catalog-list';
import CatalogPagination from './pagination/pagination';
import { fetchFilms } from '../../redux/slices/filmsSlice';

export default function Catalog() {
  const dispatch = useDispatch();
  const { filterCards, resetCards } = cardsActions;
  const { updateMASS, updateIsChanged, resetFilters } = filtersActions;
  const { filteredCardsCount } = useSelector((state) => state.cards.filtered);
  const { cards } = useSelector((state) => state.cards.default);
  const { filteringProps } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(resetCards());
    dispatch(resetFilters());
    dispatch(fetchCards());
    dispatch(fetchFilms());
  }, []);

  useEffect(() => {
    dispatch(filterCards(filteringProps));
    dispatch(updateIsChanged(filteringProps));
  }, [cards, filteringProps]);

  useEffect(() => {
    dispatch(updateMASS(cards));
  }, [cards]);

  return (
    <div className={style.catalog}>
      <h3 className={style.catalog__title}>Character cards: {filteredCardsCount}</h3>
      <CatalogPagination />
      <CatalogList />
    </div>
  );
}
