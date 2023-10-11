import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './styles.css';
import { MenuIcon, AttachIcon } from '../../images/svg';
import { iconColors } from '../../helpers';
import { DestructiveBtn, SecondaryBtn } from '../../components/Button';
import { closeChatRoom } from '../../redux/chat/operations';
import { selectChatRoomInProgress } from '../../redux/chat/selectors';

export const Footer = () => {
  const dispatch = useDispatch();
  const chatRoomInProgress = useSelector(selectChatRoomInProgress);
  const [activeMenu, setActiveMenu] = useState(false);
  const userId = localStorage.getItem('userId');

  const toggleMenu = () => {
    setActiveMenu(!activeMenu);
  };

  const handleCloseChat = () => {
    if (chatRoomInProgress) {
      dispatch(closeChatRoom({ chatRoomId: chatRoomInProgress._id, userId }));
    }
  };

  return (
    <>
      <footer className="absolute bottom-0 left-1 w-[98%]">
        <div className="relative items-center">
          <input
            className="input-style"
            type="text"
            placeholder="Введіть ваше повідомлення"
          />
          <button className="icon-style" onClick={toggleMenu}>
            <MenuIcon
              colorFill={activeMenu ? iconColors.brand : iconColors.primary}
            />
          </button>
          <button
            className="icon-style"
            style={{ right: '12px' }}
            onClick={() => {}}
          >
            <AttachIcon colorFill={iconColors.primary} />
          </button>
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
    </>
  );
};
