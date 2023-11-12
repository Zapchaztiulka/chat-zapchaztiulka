import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import theme from '../../../presets';
import './styles.css';

export const SecondaryBtn = ({ children, to, disabled, pressed, onClick }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(to);
  };

  return !disabled ? (
    <button
      className="common-style standard-button secondary-button"
      style={{
        backgroundColor: pressed && theme.colors.bgPressedDestructive,
      }}
      onClick={handleButtonClick}
    >
      {children}
    </button>
  ) : (
    <button className="common-style disabled-button secondary-button-disabled">
      {children}
    </button>
  );
};

SecondaryBtn.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  pressed: PropTypes.bool,
  onClick: PropTypes.func,
};
