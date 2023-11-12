import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './styles.css';
import { selectChat } from '@/redux/chat/selectors';
import { MessageCard } from '@/components/MessageCard';
import { Container } from '@/utils';
import { welcomeChatBot } from '@/helpers';

export const MenuPage = () => {
  const chat = useSelector(selectChat);

  return (
    <Container>
      <nav className="nav-wrapper">
        <MessageCard type="text" text={welcomeChatBot} time={chat.createdAt} />
        <div className="nav-link-wrapper">
          <NavLink className="nav-link" to="/faq">
            Найпоширеніші запитання
          </NavLink>
          <NavLink className="nav-link" to="/order-details">
            Деталі замовлення
          </NavLink>
          <NavLink className="nav-link" to="/chat">
            Чат з менеджером
          </NavLink>
        </div>
      </nav>
    </Container>
  );
};
