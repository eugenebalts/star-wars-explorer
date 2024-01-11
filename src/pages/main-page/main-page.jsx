import Container from '../../components/container/container';
import DefaultLayout from '../../layouts/default/default';
import Filters from '../../components/filters/filters';
import style from './main-page.module.scss';
import Catalog from '../../components/catalog/catalog';

export default function MainPage() {
  return (
    <DefaultLayout>
      <Container>
        <div className={style['main-page']}>
          <section className={`${style.section} ${style.section_filters}`}>
            <Filters />
          </section>
          <section className={`${style.section} ${style.section_catalog}`}>
            <Catalog />
          </section>
        </div>
      </Container>
    </DefaultLayout>
  );
}
