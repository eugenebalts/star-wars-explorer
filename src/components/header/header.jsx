import Container from '../container/container';
import style from './header.module.scss';

export default function Header() {
  return (
    <header className={style.header}>
      <Container>
        <div className={style.header__logo} />
      </Container>
    </header>
  );
}
