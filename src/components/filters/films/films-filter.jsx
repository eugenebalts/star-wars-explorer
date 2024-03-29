import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import style from './films-filter.module.scss';
import filtersStyle from '../filters.module.scss';
import { filtersActions } from '../../../redux/slices/filtersSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(film, films, theme) {
  return {
    fontWeight: films.indexOf(film) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export default function FilmsFilter() {
  const dispatch = useDispatch();
  const { updateFilms, updateSelectedFilms } = filtersActions;
  const { films } = useSelector((state) => state.films);
  const { filteringProps } = useSelector((state) => state.filters);
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    const selectedFilmsNames = typeof value === 'string' ? value.split(',') : value;

    const selectedFilmsUrl = films
      .filter((film) => selectedFilmsNames.some((selectedFilmsName) => selectedFilmsName === film.title))
      .map((film) => film.url);

    dispatch(updateFilms(selectedFilmsUrl));
    dispatch(updateSelectedFilms(selectedFilmsNames));
  };

  return (
    <div className={`${style['films-filter']} ${filtersStyle.filters__item__wrapper}`}>
      <h4>By movies</h4>
      <FormControl sx={{ m: 1, width: 250, mt: 0 }}>
        <Select
          className={style['films-filter__select']}
          multiple
          displayEmpty
          value={filteringProps.films.selected}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return 'Select movies';
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem disabled value="" className={style['films-filter__select-item']}>
            <em>Select movies</em>
          </MenuItem>
          {films.map((film) => (
            <MenuItem
              className={style['films-filter__select-item']}
              key={film.title}
              value={film.title}
              style={getStyles(film.title, filteringProps.films.selected, theme)}>
              {film.title.length < 20 ? film.title : `${film.title.slice(0, 15)}...`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
