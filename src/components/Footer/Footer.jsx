import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './styles.css';
import { MenuIcon, AttachIcon, SendIcon } from '../../images/svg';
import { iconColors } from '../../helpers';
import { DestructiveBtn, SecondaryBtn } from '../../components/Button';
import { closeChatRoom } from '../../redux/chat/operations';
import { selectChatRoomInProgress } from '../../redux/chat/selectors';

export const Footer = () => {
  const dispatch = useDispatch();
  const chatRoomInProgress = useSelector(selectChatRoomInProgress);
  const [activeMenu, setActiveMenu] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const userId = localStorage.getItem('userId');

  const toggleMenu = () => {
    setActiveMenu(!activeMenu);
  };

  const handleCloseChat = () => {
    if (chatRoomInProgress) {
      dispatch(closeChatRoom({ chatRoomId: chatRoomInProgress._id, userId }));
    }
  };

  const handleMessageChange = e => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() === '') return;

    const messageData = {
      messageOwner: 'user',
      message,
    };

    dispatch(sendMessage(messageData, chatRoomInProgress._id));

    setMessage('');
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    event.target.value = '';
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <footer className="absolute bottom-0 left-1 w-full">
        <div className="relative items-center mb-3 contentEditable">
          <textarea
            className="input-style"
            type="text"
            placeholder="Введіть ваше повідомлення"
            rows={1}
            value={message}
            onChange={handleMessageChange}
          />
          {!message && (
            <>
              <button
                type="button"
                className="icon-style"
                style={{ right: '44px' }}
                onClick={toggleMenu}
              >
                <MenuIcon
                  colorFill={activeMenu ? iconColors.brand : iconColors.primary}
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
            <button type="submit" className="icon-style" onClick={sendMessage}>
              <SendIcon />
            </button>
          )}
        </div>
        {activeMenu && (
          <div className="flex gap-3 pb-xs justify-center fade-in">
            <SecondaryBtn disabled>Головне меню</SecondaryBtn>
            <DestructiveBtn to="/" onClick={handleCloseChat}>
              Завершити діалог
            </DestructiveBtn>
          </div>
        )}
      </footer>
    </>
  );
};
