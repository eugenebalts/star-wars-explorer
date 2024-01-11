import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './catalog.module.scss';
import { fetchCards } from '../../redux/slices/cardsSlice';

export default function Catalog() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);
  const { page, search, mass, gender, films } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(
      fetchCards({
        search,
        mass,
        gender,
        films,
        page,
      })
    );
  }, [page, search, mass, gender, films]);

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  return <div className={style.catalog}>catalog</div>;
}
