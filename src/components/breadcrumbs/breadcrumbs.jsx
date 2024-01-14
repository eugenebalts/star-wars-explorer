import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './breadcrumbs.module.scss';

export default function CustomBreadcrumbs({ links, currentPage }) {
  return (
    <div className={style.breadcrumbs}>
      {links.map((item) => {
        return (
          <>
            <Link className={style.breadcrumbs__link} to={item.link} key={item.link.pageName}>
              {item.pageName}
            </Link>
            <p>/</p>
          </>
        );
      })}
      <p className={style.breadcrumbs__current}>{currentPage}</p>
    </div>
  );
}

CustomBreadcrumbs.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      pageName: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentPage: PropTypes.string.isRequired,
};
