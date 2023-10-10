import { Outlet } from 'react-router-dom';
import './styles.css';

import { Container } from '../../utils';
import { isOnlineChat } from '../../helpers';
import logo from '../../images/svg/logo/White/96px.svg';
import tailwindcss from '../../../tailwind.config';
const tailwindExtend = tailwindcss.theme.extend;

export const Header = () => {
  return (
    <>
      <header className="header-wrapper">
        <div className="logo-wrapper">
          <img src={logo} alt="logo" />
        </div>
        <div className="second-wrapper">
          <div className="title">Онлайн підтримка</div>
          <div
            className="availability"
            style={{
              backgroundColor:
                isOnlineChat &&
                tailwindExtend.colors.bgColors.pressedDestructive,
              color: isOnlineChat && tailwindExtend.colors.textColors.error,
            }}
          >
            {isOnlineChat ? 'Ми оффлайн' : 'Ми онлайн'}
          </div>
        </div>
      </header>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
