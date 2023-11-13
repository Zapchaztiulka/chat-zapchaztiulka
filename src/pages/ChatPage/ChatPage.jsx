import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { socket } from '@/socket';

import './styles.css';
import { Footer } from '@/components/Footer';
import { MessageCard } from '@/components/MessageCard';
import { PrimaryBtn } from '@/components/Button';
import { BtnLoader } from '@/components/Loader';
import { ModalWarning } from '@/components/Modal';
import { Container } from '@/utils';
import { welcomeStartChat } from '@/helpers';

import {
  updateUserStatus,
  updateManager,
  addMessage,
  closeChatByManager,
} from '../../redux/chat/actions';
import {
  selectToken,
  selectChatRoomInProgress,
  selectChat,
} from '../../redux/chat/selectors';
import { createChatRoom, closeChatRoom } from '../../redux/chat/operations';

export const ChatPage = () => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isActiveMenu, setIsActiveMenu] = useState(true);

  const storedToken = useSelector(selectToken);
  const chatRoomInProgress = useSelector(selectChatRoomInProgress);
  const user = useSelector(selectChat);

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

  // handle to close chat by Manager
  useEffect(() => {
    socket.on('closeChatByManager', ({ room }) => {
      dispatch({
        type: closeChatByManager,
        payload: { room },
      });
    });

    return () => {
      socket.off('closeChatByManager');
    };
  }, [dispatch]);

  // create chat room for user
  useEffect(() => {
    if (!chatRoomInProgress && user.isOnline === true) {
      dispatch(createChatRoom(userId));
    }
  }, [chatRoomInProgress, dispatch, user.isOnline, userId]);

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

  // handle to typing by Manager
  useEffect(() => {
    socket.on('managerTyping', ({ isTyping, roomId }) => {
      const { _id } = chatRoomInProgress;
      if (isTyping && _id && roomId === _id) {
        setIsTyping(true);
      } else setIsTyping(false);
    });

    return () => {
      socket.off('managerTyping');
    };
  }, [chatRoomInProgress]);

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

      const { _id, managerName, managerSurname } = room;

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
  }, [dispatch]);

  // when manager disconnect Redux store is updated
  useEffect(() => {
    socket.on('disconnectManager', rooms => {
      const { _id, managerName, managerSurname } = chatRoomInProgress;
      if (chatRoomInProgress) {
        const roomIndex = rooms.findIndex(room => {
          return room._id === _id;
        });

        if (roomIndex !== -1) {
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
  }, [chatRoomInProgress, isTyping]);

  // handle closing of chat room
  const handleCloseChat = () => {
    if (chatRoomInProgress) {
      dispatch(
        closeChatRoom({
          chatRoomId: _id,
          userId,
          username: user.username,
          userSurname: user.userSurname,
        })
      );
      setIsActiveMenu(false);
      setIsOpenModal(false);
    }
  };

  // handle to open modal window to approve of closing chat
  const handleOpenModal = () => setIsOpenModal(true);

  // not render if user is not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <Container>
        <section
          ref={messageContainerRef}
          className="flex flex-col gap-sPlus py-sPlus message-container"
        >
          {chatRoomInProgress && (
            <MessageCard
              type="text"
              text={welcomeStartChat}
              time={chatRoomInProgress?.createdAt}
            />
          )}
          {chatRoomInProgress &&
            chatRoomInProgress?.messages.map((message, idx) => {
              const {
                _id = idx,
                messageOwner,
                messageText,
                messageType,
                createdAt,
              } = message;
              const { managerName, managerSurname } = chatRoomInProgress;
              return (
                <MessageCard
                  key={_id}
                  owner={
                    messageOwner === 'user'
                      ? 'Ви'
                      : messageOwner === 'Бот'
                      ? 'Бот'
                      : `Менеджер ${managerName} ${managerSurname}`
                  }
                  type={messageType}
                  text={messageText}
                  time={createdAt}
                />
              );
            })}
          {isTyping && (
            <div>
              <PrimaryBtn disabled>
                <div className="flex gap-xs2">
                  <div className="font-400 text-caption text-textTertiary">
                    Менеджер друкує повідомлення
                  </div>
                  <BtnLoader height={20} width={48} radius={8} />
                </div>
              </PrimaryBtn>
            </div>
          )}
          {!chatRoomInProgress && (
            <MessageCard
              type="text"
              text="Менеджер завершив чат. Для продовження перейдіть в Головне меню"
              time={Date.now()}
            />
          )}
        </section>
        {isOpenModal && (
          <ModalWarning
            onFinishChat={handleCloseChat}
            closeModal={() => setIsOpenModal(false)}
          />
        )}
      </Container>
      <Footer
        isActiveMenu={isActiveMenu}
        isOpenModal={handleOpenModal}
        onFinishChat={handleCloseChat}
      />
    </div>
  );
};
