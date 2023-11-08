import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { socket } from '../../socket';

import './styles.css';
import { MenuIcon, AttachIcon, SendIcon } from '../../images/svg';
import { iconColors } from '../../helpers';
import { DestructiveBtn, SecondaryBtn } from '../../components/Button';
import { Loader } from '../../components/Loader';
import { sendFile } from '../../redux/chat/operations';
import { selectChatRoomInProgress } from '../../redux/chat/selectors';
import { addMessage } from '../../redux/chat/actions';

export const Footer = ({ isActiveMenu, isOpenModal, onFinishChat }) => {
  const dispatch = useDispatch();
  const chatRoomInProgress = useSelector(selectChatRoomInProgress);
  const [activeMenu, setActiveMenu] = useState(false);
  const [message, setMessage] = useState('');
  const [rows, setRows] = useState(1);
  const rowsRef = useRef(rows);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [temporaryImageURL, setTemporaryImageURL] = useState(null);
  const [isSendingFile, setIsSendingFile] = useState(false);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const userId = localStorage.getItem('userId');

  let typingTimeout;

  // handle input with auto extending of input field
  const handleMessageChange = evt => {
    const textarea = evt.target;
    const minRows = 1;
    const maxRows = 4;

    setMessage(textarea.value);

    const currentRows = Math.min(
      maxRows,
      Math.max(minRows, textarea.scrollHeight / 24)
    );

    setRows(currentRows);
    rowsRef.current = currentRows;

    // send emit when user is typing
    socket.emit('userTyping', { isTyping: true });

    // Additionally - if the user stops entering text after 2 second, we assume that he has stopped typing
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit('userTyping', { isTyping: false });
    }, 1000);
  };

  // handle a text message
  const handleSubmitMessage = () => {
    if (message.trim() === '') return;

    const messageData = {
      userId,
      roomId: chatRoomInProgress._id,
      message: {
        messageOwner: 'user',
        messageType: 'text',
        messageText: message,
      },
    };

    dispatch({
      type: addMessage,
      payload: messageData,
    });

    socket.emit('userMessage', messageData);

    setMessage('');
    setRows(1);
  };

  // send file to some Uploader for uploading and handle received data for rendering
  const sendFileToServer = () => {
    if (selectedFile) {
      setIsLoading(true);
      setIsSendingFile(true);
      const formData = new FormData();
      formData.append('chatImageURL', selectedFile);
      sendFile(formData)
        .then(data => {
          const messageData = {
            userId,
            roomId: chatRoomInProgress._id,
            message: {
              messageOwner: 'user',
              messageType: 'image',
              messageText: data.imageURL,
            },
          };

          dispatch({
            type: addMessage,
            payload: messageData,
          });

          socket.emit('userMessage', messageData);
        })
        .catch(() =>
          toast.error('Не вдалося завантажити фото. Спробуйте повторити')
        )
        .finally(() => {
          setSelectedFile(null);
          setFileSelected(false);
          setTemporaryImageURL(null);
          setIsLoading(false);
          setIsSendingFile(false);
        });
    }
  };

  // handle a previous view of image before uploading
  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileSelected(true);

    const tempURL = URL.createObjectURL(file);
    setTemporaryImageURL(tempURL);
  };

  // handle to open window to choose image-file for uploading
  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // return the rows of textarea to previous value
  const handleFocus = () => {
    if (message.trim() !== '') {
      setRows(rowsRef.current);
    }
  };

  // handle to send a message after pushing of button "Enter"
  const handleKeyDown = event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (isSendingFile) {
        sendFileToServer();
      } else {
        handleSubmitMessage();
      }
    }
  };

  // handle changing of footer menu
  const toggleMenu = () => {
    setActiveMenu(!activeMenu);
  };

  // handle to lost focus on input
  const handleOnBlur = () => {
    setRows(1); // return count of rows to initial value
    socket.emit('userTyping', { isTyping: false }); // if the user lost focus on input, we assume that he has stopped typing
  };

  // handle changing of footer menu
  useEffect(() => {
    setActiveMenu(isActiveMenu);
  }, [isActiveMenu]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <footer className="absolute bottom-0 w-full">
          <div className="relative items-center bg-mainColors-staticWhite">
            <textarea
              className="input-style"
              type="text"
              placeholder="Введіть ваше повідомлення"
              rows={rows}
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleOnBlur}
            />
            {!message && !fileSelected && (
              <>
                <button
                  type="button"
                  className="icon-style"
                  style={{ right: '44px' }}
                  onClick={toggleMenu}
                >
                  <MenuIcon
                    colorFill={
                      activeMenu ? iconColors.brand : iconColors.primary
                    }
                  />
                </button>
                <button className="icon-style" onClick={openFileInput}>
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                  <AttachIcon />
                </button>
              </>
            )}
            {message && (
              <button
                type="submit"
                className="icon-style"
                onClick={handleSubmitMessage}
              >
                <SendIcon />
              </button>
            )}
            {fileSelected && (
              <button
                type="submit"
                className="icon-style"
                onClick={sendFileToServer}
              >
                <SendIcon />
              </button>
            )}
            {temporaryImageURL && (
              <div className="bg-mainColors-staticWhite ml-5 py-5">
                <img src={temporaryImageURL} alt="Uploaded Image" />
              </div>
            )}
          </div>
          {activeMenu && (
            <div className="flex gap-3 py-xs justify-center fade-in">
              <SecondaryBtn
                to="/"
                disabled={chatRoomInProgress?.isChatRoomProcessed}
                onClick={() => onFinishChat()}
              >
                Головне меню
              </SecondaryBtn>
              <DestructiveBtn onClick={() => isOpenModal()}>
                Завершити діалог
              </DestructiveBtn>
            </div>
          )}
        </footer>
      )}
    </>
  );
};

Footer.propTypes = {
  isActiveMenu: PropTypes.bool.isRequired,
  isOpenModal: PropTypes.func.isRequired,
  onFinishChat: PropTypes.func,
};
