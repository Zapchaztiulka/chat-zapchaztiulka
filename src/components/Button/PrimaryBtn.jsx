import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { bgColors } from '@/helpers';
import './styles.css';

export const PrimaryBtn = ({ children, to, disabled, pressed, onClick }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(to);
  };

  return !disabled ? (
    <button
      className="prime"
      style={{
        backgroundColor: pressed && bgColors.pressedBlue,
      }}
      onClick={handleButtonClick}
    >
      {children}
    </button>
  ) : (
    <button className="prime-disabled">{children}</button>
  );
};

PrimaryBtn.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  pressed: PropTypes.bool,
  onClick: PropTypes.func,
};
