import PropTypes from 'prop-types';

import { PrimaryBtn } from '../Button';
import { BtnLoader } from '../Loader/BtnLoader';
import { formatDate } from '../../helpers';
import logo from '../../images/svg/logo/Black/96px.svg';
import tailwindcss from '../../../tailwind.config';

const tailwindExtend = tailwindcss.theme.extend;

export const WelcomeMsg = ({ username, date }) => {
  return (
    <>
      <div className="flex gap-4 items-center">
        <img src={logo} alt="gravatar" className="h-full w-auto" />
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
      <div className="w-xl2">
        <PrimaryBtn disabled>
          <BtnLoader
            height={16}
            width={32}
            radius={8}
            color={tailwindExtend.colors.iconColors.disabled}
          />
        </PrimaryBtn>
      </div>
    </>
  );
};

WelcomeMsg.propTypes = {
  username: PropTypes.string,
  date: PropTypes.string,
};
