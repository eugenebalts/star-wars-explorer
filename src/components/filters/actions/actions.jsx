import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../../redux/slices/filtersSlice';
import style from './actions.module.scss';

export default function FilterActions() {
  const dispatch = useDispatch();
  const { resetFilters } = filtersActions;

  const handleButtonClick = () => {
    dispatch(resetFilters());
  };

  return (
    <Button variant="contained" color="primary" onClick={handleButtonClick} className={style.actions__button}>
      Reset
    </Button>
  );
}
