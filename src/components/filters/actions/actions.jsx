import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { filtersActions } from '../../../redux/slices/filtersSlice';
import style from './actions.module.scss';

export default function FilterActions() {
  const dispatch = useDispatch();
  const { resetFilters } = filtersActions;
  const { isChanged } = useSelector((state) => state.filters);

  const handleButtonClick = () => {
    dispatch(resetFilters());
  };

  useEffect(() => {
    console.log(isChanged);
  }, [isChanged]);

  return (
    <Button
      disabled={!isChanged}
      variant="contained"
      color="primary"
      onClick={handleButtonClick}
      className={style.actions__button}>
      Reset
    </Button>
  );
}
