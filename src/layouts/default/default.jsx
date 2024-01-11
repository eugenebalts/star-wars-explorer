import PropTypes from 'prop-types';
import style from './default.module.scss';
import Header from '../../components/header/header';

export default function DefaultLayout({ children }) {
  return (
    <div className={style.wrapper}>
      <Header />
      <main>
        <div className={style.content}>{children}</div>
      </main>
    </div>
  );
}

DefaultLayout.defaultProps = {
  children: null,
};

DefaultLayout.propTypes = {
  children: PropTypes.node,
};
