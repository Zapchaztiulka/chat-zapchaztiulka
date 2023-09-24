import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { ShopCartIcon } from '../../images/svg';
import tailwindcss from '../../../tailwind.config.js';
import './styles.css';

export const OnlyIconBtn = ({ to, disabled, pressed }) => {
  const navigate = useNavigate();
  const tailwindColors = tailwindcss.theme.extend.colors;

  return !disabled ? (
    <button
      className="icon-only"
      style={{
        backgroundColor: pressed && tailwindColors.bgColors.pressedBlue,
      }}
      onClick={() => navigate(to)}
    >
      <ShopCartIcon colorFill={tailwindColors.iconColors.contrast} />
    </button>
  ) : (
    <button className="icon-only-disabled">
      <ShopCartIcon colorFill={tailwindColors.iconColors.disabled} />
    </button>
  );
};

OnlyIconBtn.propTypes = {
  to: PropTypes.string,
  disabled: PropTypes.bool,
  pressed: PropTypes.bool,
};
