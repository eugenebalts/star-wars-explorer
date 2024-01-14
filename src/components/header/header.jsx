import Container from '../container/container';
import Planet from '../../assets/planet.png';
import style from './header.module.scss';

export default function Header() {
  return (
    <header className={style.header}>
      <Container>
        <div className={style.header__logo}>
          <img className={style.header__background} src={Planet} alt="planet" />
        </div>
      </Container>
    </header>
  );
}
