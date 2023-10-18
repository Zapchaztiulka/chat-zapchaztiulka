import PropTypes from 'prop-types';

import { formatDate } from '../../helpers';

export const MessageTemplate = ({ owner = 'Бот', text, type, time }) => {
  return (
    <>
      <div
        className={`font-sans font-normal tracking-button rounded-medium
                  text-textColors-primary flex flex-col gap-1 p-3 w-5/6
                  ${
                    owner === 'Ви'
                      ? 'bg-bgColors-brandLight1 self-end'
                      : 'bg-bgColors-greyLigth self-start'
                  }
                  ${
                    type !== 'text' &&
                    ' bg-mainColors-staticWhite border border-solid border-borderColors-default'
                  }`}
        style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}
      >
        <p className="font-medium text-xs text-textColors-tertiary">{owner}</p>
        {type === 'text' && (
          <p className="text-base text-textColors-primary self-stretch">
            {text}
          </p>
        )}
        {type === 'image' && (
          <div className="max-w-xs h-auto">
            <img src={text} alt={`Image ${time}`} />
          </div>
        )}
        <p className="text-xxs text-textColors-tertiary self-end">
          {formatDate(time)}
        </p>
      </div>
    </>
  );
};

MessageTemplate.propTypes = {
  owner: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
