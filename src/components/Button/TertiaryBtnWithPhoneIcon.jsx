import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { PhoneIcon } from '../../images/svg';
import tailwindcss from '../../../tailwind.config.js';
import './styles.css';

export const TertiaryBtnWithPhoneIcon = ({
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
      className="tertiary tertiary-with-icon"
      style={{
        backgroundColor: pressed && tailwindColors.bgColors.pressedGrey,
      }}
      onClick={handleButtonClick}
    >
      <PhoneIcon colorFill={tailwindColors.iconColors.primary} />
      {children}
    </button>
  ) : (
    <button className="tertiary-disabled tertiary-with-icon">
      <PhoneIcon colorFill={tailwindColors.iconColors.disabled} />
      {children}
    </button>
  );
};

TertiaryBtnWithPhoneIcon.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  pressed: PropTypes.bool,
  onClick: PropTypes.func,
};
