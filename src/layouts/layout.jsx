import style from './layout.module.scss';
import Header from '../components/header/header';
import { Outlet } from 'react-router-dom';
import Container from '../components/container/container';
import Footer from '../components/footer/footer';

export default function Layout() {
  return (
    <div className={style.wrapper}>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
