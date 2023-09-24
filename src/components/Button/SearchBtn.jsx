import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { SearchIcon } from '../../images/svg';
import tailwindcss from '../../../tailwind.config.js';
import './styles.css';

export const SearchBtn = ({ to, disabled, pressed }) => {
  const navigate = useNavigate();
  const tailwindColors = tailwindcss.theme.extend.colors;

  return !disabled ? (
    <button
      className="search"
      style={{
        backgroundColor: pressed && tailwindColors.bgColors.pressedBlue,
      }}
      onClick={() => navigate(to)}
    >
      <SearchIcon colorFill={tailwindColors.iconColors.contrast} />
    </button>
  ) : (
    <button className="search-disabled">
      <SearchIcon colorFill={tailwindColors.iconColors.disabled} />
    </button>
  );
};

SearchBtn.propTypes = {
  to: PropTypes.string,
  disabled: PropTypes.bool,
  pressed: PropTypes.bool,
};
