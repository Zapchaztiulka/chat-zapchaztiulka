import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { ArrowDownIcon } from '../../images/svg';
import tailwindcss from '../../../tailwind.config.js';
import './styles.css';

export const TertiaryBtnWithArrow = ({ children, to, disabled, pressed }) => {
  const navigate = useNavigate();
  const tailwindColors = tailwindcss.theme.extend.colors;

  return !disabled ? (
    <button
      className="tertiary tertiary-with-icon"
      style={{
        backgroundColor: pressed && tailwindColors.bgColors.pressedGrey,
      }}
      onClick={() => navigate(to)}
    >
      {children}
      <ArrowDownIcon colorFill={tailwindColors.iconColors.brand} />
    </button>
  ) : (
    <button className="tertiary-disabled tertiary-with-icon">
      {children}
      <ArrowDownIcon colorFill={tailwindColors.iconColors.disabled} />
    </button>
  );
};

TertiaryBtnWithArrow.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  pressed: PropTypes.bool,
};
