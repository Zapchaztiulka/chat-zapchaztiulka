import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import tailwindcss from '../../../tailwind.config.js';
import './styles.css';

export const TertiaryBtn = ({ children, to, disabled, pressed }) => {
  const navigate = useNavigate();
  const tailwindColors = tailwindcss.theme.extend.colors;

  return !disabled ? (
    <button
      className="tertiary"
      style={{
        backgroundColor: pressed && tailwindColors.bgColors.pressedGrey,
      }}
      onClick={() => navigate(to)}
    >
      {children}
    </button>
  ) : (
    <button className="tertiary-disabled">{children}</button>
  );
};

TertiaryBtn.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  pressed: PropTypes.bool,
};
