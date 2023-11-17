import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import './styles.css';
import { socket } from '@/socket';

import logo from '@/images/svg/logo/White/44px.svg';
import { ArrowDownIcon } from '@/images/svg';
import { selectChatRoomInProgress } from '@/redux/chat/selectors';
import { updateIsChatRoomOpen } from '@/redux/chat/actions';

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [chatVisible, setChatVisible] = useState(true);
  const chatRoomInProgress = useSelector(selectChatRoomInProgress);
  const userId = localStorage.getItem('userId');

  // handle changing of active chat when user minimizes or extends it
  const toggleChatVisibility = () => {
    setChatVisible(!chatVisible);

    if (location.pathname !== '/') {
      const chatRoomOpenChanged = {
        userId,
        roomId: chatRoomInProgress._id,
        isChatRoomOpen: !chatVisible,
      };

      socket.emit('chatRoomOpenChanged', chatRoomOpenChanged);

      dispatch({
        type: updateIsChatRoomOpen,
        payload: chatRoomOpenChanged,
      });
    }
    socket.emit('minimizeChat', { userId, isChatRoomOpen: !chatVisible });
  };

  return (
    <>
      <header className="header-wrapper">
        <div className="logo-wrapper">
          <img src={logo} alt="logo" />
        </div>
        <div className="flex w-full justify-between pr-xs items-center">
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
