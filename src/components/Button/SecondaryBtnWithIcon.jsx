import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { ShopCartIcon } from '../../images/svg';
import tailwindcss from '../../../tailwind.config.js';
import './styles.css';

export const SecondaryBtnWithIcon = ({
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
      className="second with-icon"
      style={{
        backgroundColor: pressed && tailwindColors.bgColors.pressedGrey,
      }}
      onClick={handleButtonClick}
    >
      <ShopCartIcon colorFill={tailwindColors.iconColors.brand} />
      {children}
    </button>
  ) : (
    <button className="second-disabled with-icon">
      <ShopCartIcon colorFill={tailwindColors.iconColors.disabled} />
      {children}
    </button>
  );
};

SecondaryBtnWithIcon.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  pressed: PropTypes.bool,
  onClick: PropTypes.func,
};
