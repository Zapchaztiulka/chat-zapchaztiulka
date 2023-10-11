import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './styles.css';

import logo from '../../images/svg/logo/White/44px.svg';
import { ArrowDownIcon } from '../../images/svg';

export const Header = () => {
  const [chatVisible, setChatVisible] = useState(true);

  const toggleChatVisibility = () => {
    setChatVisible(!chatVisible);
  };

  const arrowIconRotate = chatVisible ? 'arrow-down' : 'arrow-up';

  return (
    <>
      <header className="header-wrapper">
        <div className="logo-wrapper">
          <img src={logo} alt="logo" />
        </div>
        <div className="second-wrapper">
          <div className="title">Онлайн підтримка</div>
          <button className={arrowIconRotate} onClick={toggleChatVisibility}>
            <ArrowDownIcon />
          </button>
        </div>
      </header>
      {chatVisible && <Outlet />}
    </>
  );
};
