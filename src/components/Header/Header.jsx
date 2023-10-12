import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import './styles.css';

import logo from '../../images/svg/logo/White/44px.svg';
import { ArrowDownIcon } from '../../images/svg';

export const Header = ({ socket }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [chatVisible, setChatVisible] = useState(true);
  const userId = localStorage.getItem('userId');

  const toggleChatVisibility = () => {
    setChatVisible(!chatVisible);
  };

  useEffect(() => {
    if (location.pathname !== '/') {
      if (chatVisible) {
        socket.emit('chatMinimized', { userId, isOnline: true });
      } else {
        socket.emit('chatMinimized', { userId, isOnline: false });
      }

      dispatch({
        type: 'UPDATE_USER_STATUS',
        payload: { userId, isOnline: chatVisible },
      });
    }
  }, [dispatch, chatVisible, userId, socket, location.pathname]);

  return (
    <>
      <header className="header-wrapper">
        <div className="logo-wrapper">
          <img src={logo} alt="logo" />
        </div>
        <div className="second-wrapper">
          <div className="title">Онлайн підтримка</div>
          <button
            className={chatVisible ? 'arrow-down' : 'arrow-up'}
            onClick={toggleChatVisibility}
          >
            <ArrowDownIcon />
          </button>
        </div>
      </header>
      {chatVisible && <Outlet />}
    </>
  );
};

Header.propTypes = {
  socket: PropTypes.object.isRequired,
};
