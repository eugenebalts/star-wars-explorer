import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { filtersActions } from '../../../redux/slices/filtersSlice';
import style from './actions.module.scss';

export default function FilterActions() {
  const dispatch = useDispatch();
  const { resetFilters } = filtersActions;
  const { isChanged } = useSelector((state) => state.filters);

  const handleButtonClick = () => {
    dispatch(resetFilters());
  };

  return (
    <Button
      disabled={isChanged}
      variant="contained"
      color="primary"
      onClick={handleButtonClick}
      className={style.actions__button}>
      Reset
    </Button>
  );
}
