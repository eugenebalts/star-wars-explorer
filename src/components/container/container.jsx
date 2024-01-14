import PropTypes from 'prop-types';
import style from './container.module.scss';

export default function Container({ children }) {
  return <div className={style.container}>{children}</div>;
}

Container.defaultProps = {
  children: null,
};

Container.propTypes = {
  children: PropTypes.node,
};
