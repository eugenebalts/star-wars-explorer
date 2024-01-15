import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './breadcrumbs.module.scss';
import { Fragment } from 'react';

export default function CustomBreadcrumbs({ links, currentPage }) {
  return (
    <div className={style.breadcrumbs}>
      {links.map(({ pageName, link }) => {
        return (
          <Fragment key={pageName}>
            <Link className={style.breadcrumbs__link} to={link} key={pageName}>
              {pageName}
            </Link>
            <p>/</p>
          </Fragment>
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
