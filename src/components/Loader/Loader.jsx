import PropTypes from 'prop-types';
import { ColorRing } from 'react-loader-spinner';

export const Loader = ({ isVisible }) => {
  if (isVisible) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center opacity-60">
        <ColorRing
          colors={[
            'rgba(239, 248, 255, 1)',
            'rgba(209, 233, 255, 1)',
            'rgba(46, 144, 250, 1)',
            'rgba(21, 112, 239, 1)',
            'rgba(209, 233, 255, 1)',
          ]}
        />
      </div>
    );
  }
};

Loader.propTypes = {
  isVisible: PropTypes.bool,
};
