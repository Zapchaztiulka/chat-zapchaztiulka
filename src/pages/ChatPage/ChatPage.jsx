import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import socketIO from 'socket.io-client';
import { toast } from 'react-toastify';

import { Container } from '../../utils';
import { Loader } from '../../components/Loader';
import {
  selectIsLoading,
  selectToken,
  selectChatRoomInProgress,
} from '../../redux/chat/selectors';
import { createChatRoom } from '../../redux/chat/operations';
import {
  MessageTemplate,
  welcomeStartChat,
} from '../../components/MessageTemplate';
import { Footer } from '../../components/Footer';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const socket = socketIO.connect(BACKEND_URL);

export const ChatPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const storedToken = useSelector(selectToken);
  const chatRoomInProgress = useSelector(selectChatRoomInProgress);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    socket.emit('authentication', { token: storedToken });

    if (!chatRoomInProgress) {
      dispatch(createChatRoom(userId))
        .then(data => {
          const { payload } = data;
          socket.emit('newChat', { chatRoom: payload });
        })
        .catch(() => {
          toast.info('Помилка входу в чат. Спробуйте повторити');
        });
    } else {
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

  return (
    <div>
      <Container>
        <section className="flex flex-col gap-5 py-5">
          {isLoading && <Loader />}
          {!isLoading && (
            <MessageTemplate
              text={welcomeStartChat}
              time={chatRoomInProgress?.createdAt}
            />
          )}
        </section>
      </Container>
      <Footer />
    </div>
  );
};
