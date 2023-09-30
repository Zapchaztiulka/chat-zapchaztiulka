import PropTypes from 'prop-types';
import { formatDate } from '../../helpers';

export const WelcomeMsg = ({ username, date }) => {
  return (
    <div>
      <img src="" alt="gravatar" className="" />
      <div className="flex flex-col gap-2 p-xs border border-solid border-borderColors-default rounded-medium">
        <p className="font-sans font-semibold text-base leading-6 self-start">
          Шановний {username.length === 0 ? 'клієнте' : username}. Вас вітає
          служба підтримки магазину. Очікуйте на з'єднання з менеджером...
        </p>
        <p className="font-sans font-light text-xs text-textColors-disabled self-end">
          {formatDate(date)}
        </p>
      </div>
    </div>
  );
};

WelcomeMsg.propTypes = {
  username: PropTypes.string,
  date: PropTypes.string.isRequired,
};
