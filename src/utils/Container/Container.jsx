import PropTypes from 'prop-types';
import './styles.css';

export const Container = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node,
};
