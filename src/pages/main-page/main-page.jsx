import Container from '../../components/container/container';
import DefaultLayout from '../../layouts/default/default';
import Filters from '../../components/filters/filters';
import style from './main-page.module.scss';
import pageStyle from '../page.module.scss';
import Catalog from '../../components/catalog/catalog';
import MobileFilters from '../../components/filters/mobile-filters';
import { useEffect, useState } from 'react';

export default function MainPage() {
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <DefaultLayout>
      <Container>
        <div className={`${style['main-page']} ${pageStyle.page}`}>
          <section className={`${pageStyle.section} ${style.section} ${style.section_catalog}`}>
            {isTablet ? <MobileFilters /> : <Filters />}
            <Catalog />
          </section>
        </div>
      </Container>
    </DefaultLayout>
  );
}
