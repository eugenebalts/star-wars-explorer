import style from './filters.module.scss';
import FilterActions from './actions/actions';
import FilmsFilter from './films/films-filter';
import NameFilter from './name/name-filter';
import GenderFilter from './gender/gender-filter';
import MassFilter from './mass/mass-filter';

export default function Filters() {
  return (
    <div className={style.filters}>
      <h3>Filters</h3>
      <div className={style.filters__list}>
        <div className={style.filters__item}>
          <FilmsFilter />
        </div>
        <div className={style.filters__item}>
          <NameFilter />
        </div>
        <div className={style.filters__item}>
          <GenderFilter />
        </div>
        <div className={style.filters__item}>
          <MassFilter />
        </div>
      </div>
      <FilterActions />
    </div>
  );
}
