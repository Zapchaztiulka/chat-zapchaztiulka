import PropTypes from 'prop-types';

const PhoneIcon = ({ colorFill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M14.2038 6.28837C15.0669 6.45676 15.8601 6.87886 16.4818 7.50064C17.1036 8.12242 17.5257 8.9156 17.6941 9.77866M14.2038 2.75391C15.9969 2.95311 17.669 3.75608 18.9455 5.03099C20.222 6.3059 21.0271 7.97697 21.2286 9.76982M20.345 16.8211V19.4719C20.346 19.718 20.2955 19.9616 20.197 20.1871C20.0984 20.4126 19.9538 20.615 19.7724 20.7813C19.5911 20.9477 19.377 21.0744 19.1439 21.1532C18.9108 21.232 18.6638 21.2613 18.4187 21.2392C15.6996 20.9437 13.0878 20.0146 10.7931 18.5265C8.65809 17.1698 6.84801 15.3597 5.49136 13.2248C3.99803 10.9196 3.0687 8.29506 2.77866 5.56381C2.75658 5.31946 2.78561 5.07319 2.86393 4.84068C2.94224 4.60817 3.0681 4.39451 3.23351 4.21331C3.39892 4.0321 3.60025 3.88733 3.82467 3.7882C4.0491 3.68907 4.29171 3.63775 4.53705 3.63752H7.1879C7.61673 3.6333 8.03246 3.78516 8.3576 4.06478C8.68275 4.3444 8.89512 4.73272 8.95514 5.15734C9.06702 6.00567 9.27452 6.83862 9.57367 7.64031C9.69255 7.95657 9.71828 8.30029 9.64781 8.63073C9.57734 8.96118 9.41361 9.26449 9.17604 9.50474L8.05385 10.6269C9.31172 12.8391 11.1434 14.6708 13.3555 15.9286L14.4777 14.8064C14.718 14.5689 15.0213 14.4051 15.3517 14.3347C15.6822 14.2642 16.0259 14.2899 16.3422 14.4088C17.1439 14.708 17.9768 14.9155 18.8251 15.0273C19.2544 15.0879 19.6464 15.3041 19.9266 15.6348C20.2068 15.9655 20.3557 16.3877 20.345 16.8211Z"
      stroke={colorFill}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PhoneIcon;

PhoneIcon.propTypes = {
  colorFill: PropTypes.string,
};
