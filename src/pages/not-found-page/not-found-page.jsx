import style from './not-found-page.module.scss';
import pageStyle from '../page.module.scss';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className={`${style['not-found']} ${pageStyle.page}`}>
      <h1 className={style['not-found__title']}>404</h1>
      <h2>Not Found</h2>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Back to catalog
      </Button>
    </div>
  );
}
