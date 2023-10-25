import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { socket } from '../../socket';

import './styles.css';
import { Footer } from '../../components/Footer';
import { MessageTemplate } from '../../components/MessageTemplate';
import { Container } from '../../utils';
import { welcomeStartChat } from '../../helpers';

import {
  updateUserStatus,
  updateManager,
  addMessage,
} from '../../redux/chat/actions';
import {
  selectToken,
  selectChatRoomInProgress,
} from '../../redux/chat/selectors';
import { createChatRoom } from '../../redux/chat/operations';

export const ChatPage = () => {
  const dispatch = useDispatch();
  const storedToken = useSelector(selectToken);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const chatRoomInProgress = useSelector(selectChatRoomInProgress);
  const messageContainerRef = useRef(null);
  const userId = localStorage.getItem('userId');

  // send token to the server for authentication
  useEffect(() => {
    socket.emit('authentication', { token: storedToken });
    setIsAuthenticated(true);
  }, [storedToken]);

  // handle authentication error
  socket.on('authenticationError', ({ message }) => {
    toast.error(message);
    setIsAuthenticated(false);
  });

  // create chat room for user if it was not before
  useEffect(() => {
    if (!chatRoomInProgress) {
      dispatch(createChatRoom(userId));
    }
  }, [chatRoomInProgress, dispatch, userId]);

  // handle new message from manager
  useEffect(() => {
    socket.on('managerMessage', ({ roomId, message }) => {
      dispatch({
        type: addMessage,
        payload: { roomId, message },
      });
    });

    return () => {
      socket.off('managerMessage');
    };
  }, [dispatch]);

  // update status in Redux store when user enters or quits
  useEffect(() => {
    socket.on('userStatusChanged', ({ userId, isOnline }) => {
      dispatch({ type: updateUserStatus, payload: { userId, isOnline } });
    });

    return () => {
      socket.off('userStatusChanged');
    };
  }, [dispatch]);

  // update Redux store after manager connection
  useEffect(() => {
    socket.on('managerJoinToChat', room => {
      dispatch({ type: updateManager, payload: room });

      const { _id, managerName, managerSurname } = chatRoomInProgress;
      if (managerName) {
        const messageData = {
          roomId: _id,
          message: {
            messageOwner: 'Бот',
            messageType: 'text',
            messageText: `До чату приєднався менеджер ${managerName} ${managerSurname}`,
            createdAt: Date.now(),
          },
        };

        dispatch({
          type: addMessage,
          payload: messageData,
        });
      }
    });

    return () => {
      socket.off('managerJoinToChat');
    };
  }, [chatRoomInProgress, dispatch]);

  // when manager disconnect Redux store is updated
  useEffect(() => {
    socket.on('disconnectManager', rooms => {
      if (chatRoomInProgress) {
        const { _id, managerName, managerSurname } = chatRoomInProgress;

        const roomIndex = rooms.findIndex(room => {
          return room._id === _id;
        });

        dispatch({ type: updateManager, payload: rooms[roomIndex] });
        const messageData = {
          roomId: _id,
          message: {
            messageOwner: 'Бот',
            messageType: 'text',
            messageText: `Менеджер ${managerName} ${managerSurname} від'єднався. Очікуйте підключення менеджера...`,
            createdAt: Date.now(),
          },
        };

        dispatch({
          type: addMessage,
          payload: messageData,
        });
      }
    });

    return () => {
      socket.off('disconnectManager');
    };
  }, [chatRoomInProgress, dispatch]);

  // automatic scroll when new message is added
  useEffect(() => {
    if (messageContainerRef.current) {
      const scrollHeight = messageContainerRef.current.scrollHeight;
      const maxVisibleHeight = messageContainerRef.current.clientHeight;

      if (scrollHeight > maxVisibleHeight) {
        messageContainerRef.current.scrollTop = scrollHeight - maxVisibleHeight;
      }
    }
  }, [chatRoomInProgress]);

  // not render if user is not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <Container>
        <section
          ref={messageContainerRef}
          className="flex flex-col gap-5 py-5 message-container"
        >
          <MessageTemplate
            type="text"
            text={welcomeStartChat}
            time={chatRoomInProgress?.createdAt}
          />
          {chatRoomInProgress &&
            chatRoomInProgress?.messages.map((message, idx) => {
              const {
                _id = idx,
                messageOwner,
                messageText,
                messageType,
                createdAt = Date.now(),
              } = message;
              return (
                <MessageTemplate
                  key={_id}
                  owner={
                    messageOwner === 'user'
                      ? 'Ви'
                      : `Менеджер ${chatRoomInProgress.managerName} ${chatRoomInProgress.managerSurname}`
                  }
                  type={messageType}
                  text={messageText}
                  time={createdAt}
                />
              );
            })}
        </section>
      </Container>
      <Footer />
    </div>
  );
};
