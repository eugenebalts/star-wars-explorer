import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import style from './films-filter.module.scss';
import filtersStyle from '../filters.module.scss';

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

const mockFilmList = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(film, films, theme) {
  return {
    fontWeight: films.indexOf(film) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export default function FilmsFilter() {
  const theme = useTheme();
  const [films, setFilms] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilms(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div className={`${style['films-filter']} ${filtersStyle.filters__item__wrapper}`}>
      <h3>By movies</h3>
      <FormControl sx={{ m: 1, width: 250, mt: 0 }}>
        <Select
          className={style['films-filter__select']}
          multiple
          displayEmpty
          value={films}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span>Select movies</span>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="" className={style['films-filter__select-item']}>
            <em>Select movies</em>
          </MenuItem>
          {mockFilmList.map((film) => (
            <MenuItem
              className={style['films-filter__select-item']}
              key={film}
              value={film}
              style={getStyles(film, films, theme)}
            >
              {film}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
