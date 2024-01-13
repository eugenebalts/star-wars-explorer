import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { filtersActions } from '../../../redux/slices/filtersSlice';
import style from './actions.module.scss';

export default function FilterActions() {
  const dispatch = useDispatch();
  const { resetFilters } = filtersActions;
  const { filteringProps } = useSelector((state) => state.filters);
  const [disabled, setDisabled] = useState(false);

  const handleButtonClick = () => {
    dispatch(resetFilters());
  };

  useEffect(() => {
    const isChanged = [
      ...Object.keys(filteringProps).map((key) => {
        return filteringProps[key].isChanged;
      }),
    ].every((prop) => !prop);

    setDisabled(isChanged);
  }, [filteringProps]);

  return (
    <Button
      disabled={disabled}
      variant="contained"
      color="primary"
      onClick={handleButtonClick}
      className={style.actions__button}>
      Reset
    </Button>
  );
}
