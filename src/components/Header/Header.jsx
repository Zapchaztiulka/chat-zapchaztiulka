import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import './styles.css';
import { socket } from '../../socket';

import logo from '../../images/svg/logo/White/44px.svg';
import { ArrowDownIcon } from '../../images/svg';
import { selectChatRoomInProgress } from '../../redux/chat/selectors';
import { updateIsChatRoomOpen } from '../../redux/chat/actions';

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [chatVisible, setChatVisible] = useState(true);
  const chatRoomInProgress = useSelector(selectChatRoomInProgress);
  const userId = localStorage.getItem('userId');

  // handle changing of active chat when user unfolded or rolled up it
  const toggleChatVisibility = () => {
    setChatVisible(!chatVisible);
  };

  // deliver an event by sockets when chat is rolling up or unfolding
  useEffect(() => {
    if (location.pathname !== '/' && chatRoomInProgress) {
      const chatRoomOpenChanged = {
        userId,
        roomId: chatRoomInProgress._id,
        isChatRoomOpen: chatVisible,
      };

      if (chatVisible) {
        socket.emit('chatRoomOpenChanged', chatRoomOpenChanged);
      } else {
        socket.emit('chatRoomOpenChanged', chatRoomOpenChanged);
      }

      dispatch({
        type: updateIsChatRoomOpen,
        payload: chatRoomOpenChanged,
      });
    }
  }, [chatRoomInProgress, chatVisible, dispatch, location.pathname, userId]);

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
