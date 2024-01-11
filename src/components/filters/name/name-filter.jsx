import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { filtersActions } from '../../../redux/slices/filtersSlice';
import style from './name-filter.module.scss';
import filtersStyle from '../filters.module.scss';

let timer;

export default function NameFilter() {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.filters);
  const { updateSearch } = filtersActions;
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      dispatch(updateSearch(input));
    }, 1000);
  }, [input]);

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
