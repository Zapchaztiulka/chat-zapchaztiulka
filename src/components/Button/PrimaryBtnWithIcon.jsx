import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { ShopCartIcon } from '../../images/svg';
import tailwindcss from '../../../tailwind.config.js';
import './styles.css';

export const PrimaryBtnWithIcon = ({
  children,
  to,
  disabled,
  pressed,
  onClick,
}) => {
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
      className="prime with-icon"
      style={{
        backgroundColor: pressed && tailwindColors.bgColors.pressedBlue,
      }}
      onClick={handleButtonClick}
    >
      <ShopCartIcon colorFill={tailwindColors.iconColors.contrast} />
      {children}
    </button>
  ) : (
    <button className="prime-disabled with-icon">
      <ShopCartIcon colorFill={tailwindColors.iconColors.disabled} />
      {children}
    </button>
  );
};

PrimaryBtnWithIcon.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  pressed: PropTypes.bool,
  onClick: PropTypes.func,
};
