import Button from '@mui/material/Button';
import style from './actions.module.scss';

export default function FilterActions() {
  const handleButtonClick = () => {
    console.log('Reset filters');
  };

  return (
    <Button variant="contained" color="primary" onClick={handleButtonClick} className={style.actions__button}>
      Reset
    </Button>
  );
}
