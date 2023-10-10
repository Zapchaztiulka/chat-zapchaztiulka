import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import socketIO from 'socket.io-client';
import { toast } from 'react-toastify';

import { SecondaryBtn, DestructiveBtn } from '../../components/Button';
import { WelcomeMsg } from '../../components/WelcomeMsg';
import { Loader } from '../../components/Loader';
import { Container } from '../../utils';

import {
  selectIsLoading,
  selectToken,
  selectChat,
  selectChatRoomInProgress,
} from '../../redux/chat/selectors';
import { closeChatRoom, createChatRoom } from '../../redux/chat/operations';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const socket = socketIO.connect(BACKEND_URL);

export const ChatPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const storedToken = useSelector(selectToken);
  const chat = useSelector(selectChat);
  const chatRoomInProgress = useSelector(selectChatRoomInProgress);

  const userId = localStorage.getItem('userId');

  const [chatRoomData, setChatRoomData] = useState({});

  useEffect(() => {
    socket.emit('authentication', { token: storedToken });

    if (!chatRoomInProgress) {
      dispatch(createChatRoom(userId))
        .then(data => {
          const { payload } = data;
          setChatRoomData(payload);

          socket.emit('newChat', { chatRoom: payload });
        })
        .catch(() => {
          toast.info('Помилка входу в чат. Спробуйте повторити');
        });
    } else {
      setChatRoomData(chatRoomInProgress);

      socket.emit('newChat', { chatRoom: chatRoomInProgress });
    }
  }, [chatRoomInProgress, dispatch, storedToken, userId]);

  useEffect(() => {
    socket.on('userStatusChanged', ({ userId, isOnline }) => {
      dispatch({ type: 'UPDATE_USER_STATUS', payload: { userId, isOnline } });
    });

    return () => {
      socket.off('userStatusChanged');
    };
  }, [dispatch]);

  const handleCloseChat = () => {
    dispatch(closeChatRoom({ chatRoomId: chatRoomInProgress._id, userId }));
    setChatRoomData({});
  };

  return (
    <Container>
      <div className="flex flex-col gap-5 pt-5">
        {isLoading && <Loader />}
        {!isLoading && (
          <div className="flex flex-col gap-5">
            {!chatRoomInProgress?.managerId && (
              <WelcomeMsg
                username={chat.username}
                date={chatRoomData.createdAt}
              />
            )}
          </div>
        )}
        <div className="flex gap-5">
          <SecondaryBtn to="/">Головне меню</SecondaryBtn>
          <DestructiveBtn to="/" onClick={handleCloseChat}>
            Завершити чат
          </DestructiveBtn>
        </div>
      </div>
    </Container>
  );
};
