import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { ShopCartIcon } from '../../images/svg';
import tailwindcss from '../../../tailwind.config.js';
import './styles.css';

export const DestructiveBtnWithIcon = ({ children, to, disabled, pressed }) => {
  const navigate = useNavigate();
  const tailwindColors = tailwindcss.theme.extend.colors;

  return !disabled ? (
    <button
      className="destructive with-icon"
      style={{
        backgroundColor: pressed && tailwindColors.bgColors.pressedDestructive,
      }}
      onClick={() => navigate(to)}
    >
      <ShopCartIcon colorFill={tailwindColors.iconColors.contrast} />
      {children}
    </button>
  ) : (
    <button className="destructive-disabled with-icon">
      <ShopCartIcon colorFill={tailwindColors.iconColors.disabled} />
      {children}
    </button>
  );
};

DestructiveBtnWithIcon.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  pressed: PropTypes.bool,
};
