import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import style from './films-filter.module.scss';

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
    <FormControl sx={{ m: 1, width: 250, mt: 0 }} className={style['films-filter']}>
      <Select
        className={style['films-filter__select']}
        multiple
        displayEmpty
        value={films}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Select films</em>;
          }

          return selected.join(', ');
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}>
        <MenuItem disabled value="" className={style['films-filter__select-item']}>
          <em>Select films</em>
        </MenuItem>
        {mockFilmList.map((film) => (
          <MenuItem
            className={style['films-filter__select-item']}
            key={film}
            value={film}
            style={getStyles(film, films, theme)}>
            {film}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
