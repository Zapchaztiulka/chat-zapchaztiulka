import PropTypes from 'prop-types';

const ArrowDownIcon = ({ colorFill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M6 9.5L12 15.5L18 9.5"
      stroke={colorFill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowDownIcon;

ArrowDownIcon.propTypes = {
  colorFill: PropTypes.string,
};
