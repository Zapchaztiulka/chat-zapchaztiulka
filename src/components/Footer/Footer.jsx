import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import './styles.css';
import { MenuIcon, AttachIcon, SendIcon } from '../../images/svg';
import { iconColors } from '../../helpers';
import { DestructiveBtn, SecondaryBtn } from '../../components/Button';
import { Loader } from '../../components/Loader';
import { closeChatRoom, sendFile } from '../../redux/chat/operations';
import { selectChatRoomInProgress } from '../../redux/chat/selectors';
import { addMessage } from '../../redux/chat/actions';

export const Footer = ({ socket }) => {
  const dispatch = useDispatch();
  const chatRoomInProgress = useSelector(selectChatRoomInProgress);
  const [activeMenu, setActiveMenu] = useState(false);
  const [message, setMessage] = useState('');
  const [rows, setRows] = useState(1);
  const rowsRef = useRef(rows);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [temporaryImageURL, setTemporaryImageURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);
  const userId = localStorage.getItem('userId');

  // handle closing of chat room
  const handleCloseChat = () => {
    if (chatRoomInProgress) {
      dispatch(closeChatRoom({ chatRoomId: chatRoomInProgress._id, userId }));
    }
  };

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
        createdAt: Date.now(),
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

  // send file for uploading to some Uploader and handle received data for rendering
  const sendFileToServer = () => {
    if (selectedFile) {
      setIsLoading(true);
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
              createdAt: Date.now(),
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

  // handle changing of footer menu
  const toggleMenu = () => {
    setActiveMenu(!activeMenu);
  };

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
              onFocus={handleFocus}
              onBlur={() => setRows(1)} // return count of rows to initial value
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
              <SecondaryBtn disabled>Головне меню</SecondaryBtn>
              <DestructiveBtn to="/" onClick={handleCloseChat}>
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
  socket: PropTypes.object.isRequired,
};
