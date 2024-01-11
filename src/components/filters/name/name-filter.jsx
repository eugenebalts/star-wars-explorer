import { TextField } from '@mui/material';
import style from './name-filter.module.scss';
import filtersStyle from '../filters.module.scss';

export default function NameFilter() {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);
  };

  return (
    <div className={`${style['name-filter']} ${filtersStyle.filters__item__wrapper}`}>
      <h3>By names</h3>
      <TextField id="outlined-basic" label="Type name" variant="outlined" onChange={handleChange} color="primary" />
    </div>
  );
}
