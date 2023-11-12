import PropTypes from 'prop-types';

import theme from '../../../presets';

const MenuIcon = ({ activeMenu }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M7.5 11.35C5.09756 11.35 3.15 9.40244 3.15 7C3.15 4.59756 5.09756 2.65 7.5 2.65C9.90244 2.65 11.85 4.59756 11.85 7C11.85 9.40244 9.90244 11.35 7.5 11.35ZM7.5 21.35C5.09756 21.35 3.15 19.4025 3.15 17C3.15 14.5975 5.09756 12.65 7.5 12.65C9.90244 12.65 11.85 14.5975 11.85 17C11.85 19.4025 9.90244 21.35 7.5 21.35ZM17.5 11.35C15.0975 11.35 13.15 9.40244 13.15 7C13.15 4.59756 15.0975 2.65 17.5 2.65C19.9025 2.65 21.85 4.59756 21.85 7C21.85 9.40244 19.9025 11.35 17.5 11.35ZM17.5 21.35C15.0975 21.35 13.15 19.4025 13.15 17C13.15 14.5975 15.0975 12.65 17.5 12.65C19.9025 12.65 21.85 14.5975 21.85 17C21.85 19.4025 19.9025 21.35 17.5 21.35ZM7.5 9.65C8.96355 9.65 10.15 8.46355 10.15 7C10.15 5.53645 8.96355 4.35 7.5 4.35C6.03645 4.35 4.85 5.53645 4.85 7C4.85 8.46355 6.03645 9.65 7.5 9.65ZM7.5 19.65C8.96355 19.65 10.15 18.4635 10.15 17C10.15 15.5365 8.96355 14.35 7.5 14.35C6.03645 14.35 4.85 15.5365 4.85 17C4.85 18.4635 6.03645 19.65 7.5 19.65ZM17.5 9.65C18.9635 9.65 20.15 8.46355 20.15 7C20.15 5.53645 18.9635 4.35 17.5 4.35C16.0365 4.35 14.85 5.53645 14.85 7C14.85 8.46355 16.0365 9.65 17.5 9.65ZM17.5 19.65C18.9635 19.65 20.15 18.4635 20.15 17C20.15 15.5365 18.9635 14.35 17.5 14.35C16.0365 14.35 14.85 15.5365 14.85 17C14.85 18.4635 16.0365 19.65 17.5 19.65Z"
      fill={activeMenu ? theme.colors.iconBrand : theme.colors.iconPrimary}
      stroke="white"
      strokeWidth="0.3"
    />
  </svg>
);

export default MenuIcon;

MenuIcon.propTypes = {
  activeMenu: PropTypes.bool,
};
