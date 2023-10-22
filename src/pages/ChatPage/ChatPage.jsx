import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { socket } from '../../socket';

import './styles.css';
import { Footer } from '../../components/Footer';
import { MessageTemplate } from '../../components/MessageTemplate';
import { Container } from '../../utils';
import { welcomeStartChat } from '../../helpers';

import { updateUserStatus, updateManager } from '../../redux/chat/actions';
import {
  selectToken,
  selectChatRoomInProgress,
} from '../../redux/chat/selectors';
import { createChatRoom } from '../../redux/chat/operations';

export const ChatPage = () => {
  const dispatch = useDispatch();
  const storedToken = useSelector(selectToken);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isManagerConnect, setIsManagerConnect] = useState(false);
  const [isManagerDisconnect, setIsManagerDisconnect] = useState(false);
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
      setIsManagerConnect(true);
      dispatch({ type: updateManager, payload: room });
    });

    return () => {
      socket.off('managerJoinToChat');
    };
  }, [dispatch]);

  // when manager disconnect - Redux store is updated
  useEffect(() => {
    socket.on('disconnectManager', room => {
      console.log('🚀 ~ file: ChatPage.jsx:74 ~ useEffect ~ room:', room);
      setIsManagerDisconnect(true);
      dispatch({ type: updateManager, payload: room });
    });

    return () => {
      socket.off('disconnectManager');
    };
  }, [dispatch]);

  // automatic scroll when new message adds
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
          {isManagerConnect && (
            <MessageTemplate
              type="text"
              text={`До чату приєднався менеджер ${chatRoomInProgress.managerName} ${chatRoomInProgress.managerSurname}`}
              time={Date.now()}
            />
          )}
          {isManagerDisconnect && (
            <MessageTemplate
              type="text"
              text={`Менеджер ${chatRoomInProgress.managerName} ${chatRoomInProgress.managerSurname} від'єднався. Очікуйте підключення менеджера...`}
              time={Date.now()}
            />
          )}
        </section>
      </Container>
      <Footer />
    </div>
  );
};
