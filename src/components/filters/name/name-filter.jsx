import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { filtersActions } from '../../../redux/slices/filtersSlice';
import style from './name-filter.module.scss';
import filtersStyle from '../filters.module.scss';
import debounce from '../../../utils/debounce';

export default function NameFilter() {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.filters);
  const { updateSearch } = filtersActions;
  const [input, setInput] = useState('');

  const debouncedUpdateSearch = debounce((value) => {
    dispatch(updateSearch(value));
  }, 1000);

  const handleChange = (event) => {
    setInput(event.target.value);

    debouncedUpdateSearch(event.target.value);
  };

  useEffect(() => {
    setInput(search);
  }, [search]);

  return (
    <div className={`${style['name-filter']} ${filtersStyle.filters__item__wrapper}`}>
      <h3>By names</h3>
      <TextField
        id="outlined-basic"
        label="Type name"
        variant="outlined"
        onChange={handleChange}
        color="primary"
        value={input}
      />
    </div>
  );
}
