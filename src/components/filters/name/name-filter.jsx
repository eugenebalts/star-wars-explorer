import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { filtersActions } from '../../../redux/slices/filtersSlice';
import style from './name-filter.module.scss';
import filtersStyle from '../filters.module.scss';

export default function NameFilter() {
  const dispatch = useDispatch();
  const { filteringProps } = useSelector((state) => state.filters);
  const { updateSearch } = filtersActions;

  const handleChange = (event) => {
    dispatch(updateSearch(event.target.value));
  };

  return (
    <div className={`${style['name-filter']} ${filtersStyle.filters__item__wrapper}`}>
      <h3>By names</h3>
      <TextField
        id="outlined-basic"
        label="Type name"
        variant="outlined"
        onChange={handleChange}
        color="primary"
        value={filteringProps.name.value}
      />
    </div>
  );
}
