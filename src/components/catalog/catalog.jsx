import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { cardsActions, fetchCards } from '../../redux/slices/cardsSlice';
import { filtersActions } from '../../redux/slices/filtersSlice';
import style from './catalog.module.scss';
import CatalogList from './catalog-list/catalog-list';
import CatalogPagination from './pagination/pagination';

export default function Catalog() {
  const dispatch = useDispatch();
  const { filterCards } = cardsActions;
  const { updateMASS, updateIsChanged } = filtersActions;
  const { filteredCardsCount } = useSelector((state) => state.cards.filtered);
  const { cards } = useSelector((state) => state.cards.default);
  const { filteringProps } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchCards());
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
