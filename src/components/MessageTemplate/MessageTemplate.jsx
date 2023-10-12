import PropTypes from 'prop-types';

import { formatDate } from '../../helpers';
import { welcomeChatBot } from './welcomeMsg';

export const MessageTemplate = ({
  owner = 'Бот',
  text = welcomeChatBot,
  time,
}) => {
  return (
    <>
      <div
        className={`font-sans font-normal tracking-button rounded-medium
                  text-textColors-primary flex flex-col gap-1 p-3
                  ${
                    owner === 'Я'
                      ? 'bg-bgColors-brandLight1'
                      : 'bg-bgColors-greyLigth'
                  }`}
      >
        <p className="font-medium text-xs text-textColors-tertiary">{owner}</p>
        <p className="text-base text-textColors-primary self-stretch">{text}</p>
        <p className="text-xxs text-textColors-tertiary self-end">
          {formatDate(time)}
        </p>
      </div>
    </>
  );
};

MessageTemplate.propTypes = {
  owner: PropTypes.string,
  text: PropTypes.string,
  time: PropTypes.string,
};
