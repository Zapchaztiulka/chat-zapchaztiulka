import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import tailwindcss from '../../../tailwind.config.js';
import './styles.css';

export const DestructiveBtn = ({ children, to, disabled, pressed }) => {
  const navigate = useNavigate();
  const tailwindColors = tailwindcss.theme.extend.colors;

  return !disabled ? (
    <button
      className="destructive"
      style={{
        backgroundColor: pressed && tailwindColors.bgColors.pressedDestructive,
      }}
      onClick={() => navigate(to)}
    >
      {children}
    </button>
  ) : (
    <button className="destructive-disabled">{children}</button>
  );
};

DestructiveBtn.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  pressed: PropTypes.bool,
};
