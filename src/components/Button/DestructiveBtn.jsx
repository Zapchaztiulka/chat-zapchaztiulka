import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { bgColors } from '@/helpers';
import './styles.css';

export const DestructiveBtn = ({
  children,
  to,
  disabled,
  pressed,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(to);
  };

  return !disabled ? (
    <button
      className="destructive"
      style={{
        backgroundColor: pressed && bgColors.pressedDestructive,
      }}
      onClick={handleButtonClick}
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
  onClick: PropTypes.func,
};
