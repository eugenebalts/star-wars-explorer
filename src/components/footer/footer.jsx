import { Link } from '@mui/material';
import Container from '../container/container';
import style from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <Container>
        <p className={style.footer__content}>
          Developed by{' '}
          <Link href="https://github.com/eugenebalts" underline="hover">
            {' '}
            eugenebalts
          </Link>
        </p>
      </Container>
    </footer>
  );
}
