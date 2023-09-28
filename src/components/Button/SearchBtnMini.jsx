import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { SearchIcon } from '../../images/svg';
import tailwindcss from '../../../tailwind.config.js';
import './styles.css';

export const SearchBtnMini = ({ to, disabled, pressed, onClick }) => {
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
      className="search search-mini"
      style={{
        backgroundColor: pressed && tailwindColors.bgColors.pressedBlue,
      }}
      onClick={handleButtonClick}
    >
      <SearchIcon colorFill={tailwindColors.iconColors.contrast} />
    </button>
  ) : (
    <button className="search-disabled search-mini">
      <SearchIcon colorFill={tailwindColors.iconColors.disabled} />
    </button>
  );
};

SearchBtnMini.propTypes = {
  to: PropTypes.string,
  disabled: PropTypes.bool,
  pressed: PropTypes.bool,
  onClick: PropTypes.func,
};
