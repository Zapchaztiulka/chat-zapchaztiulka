import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import socketIO from 'socket.io-client';

import { SecondaryBtn, DestructiveBtn } from '../../components/Button';
import { Loader } from '../../components/Loader';
import { Container } from '../../utils';
import { formatDate } from '../../helpers';

import {
  selectChatRoom,
  selectIsLoading,
  selectToken,
} from '../../redux/chat/selectors';
import { closeChat } from '../../redux/chat/operations';

// const socket = socketIO.connect('https://spares-backend-i2mq.onrender.com');
const socket = socketIO.connect('http://localhost:5000');

export const ChatPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const storedToken = useSelector(selectToken);
  const chatRoom = useSelector(selectChatRoom);
  const { messages, userId, username, _id } = chatRoom;

  useEffect(() => {
    socket.emit('authentication', { token: storedToken });
  }, [storedToken]);

  const handleCloseChat = () => {
    // localStorage.removeItem('userId');
    dispatch(closeChat(_id));
  };

  return (
    <Container>
      <div className="flex flex-col gap-5 items-start">
        {isLoading && <Loader />}
        {!isLoading && (
          <div className="p-5 flex flex-col gap-5">
            <h2>user ID: {userId}</h2>
            <h3>User name: {username}</h3>
            <h5>{messages[0].message}</h5>
            <p>{formatDate(messages[0].createdAt)}</p>
          </div>
        )}
        <SecondaryBtn to="/">Повернутися до меню</SecondaryBtn>
        <DestructiveBtn to="/" onClick={handleCloseChat}>
          Завершити розмову
        </DestructiveBtn>
      </div>
    </Container>
  );
};
