import Button from '@mui/material/Button';
import style from './actions.module.scss';

export default function FilterActions() {
  const handleButtonClick = async () => {
    console.log('');
  };

  return (
    <Button variant="contained" color="primary" onClick={handleButtonClick} className={style.actions__button}>
      Reset
    </Button>
  );
}
