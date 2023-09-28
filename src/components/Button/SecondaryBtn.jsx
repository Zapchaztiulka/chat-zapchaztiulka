import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import tailwindcss from '../../../tailwind.config.js';
import './styles.css';

export const SecondaryBtn = ({ children, to, disabled, pressed, onClick }) => {
  const navigate = useNavigate();
  const tailwindColors = tailwindcss.theme.extend.colors;

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(to);
  };

  return !disabled ? (
    <button
      className="second"
      style={{
        backgroundColor: pressed && tailwindColors.bgColors.pressedGrey,
      }}
      onClick={handleButtonClick}
    >
      {children}
    </button>
  ) : (
    <button className="second-disabled">{children}</button>
  );
};

SecondaryBtn.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  pressed: PropTypes.bool,
  onClick: PropTypes.func,
};
