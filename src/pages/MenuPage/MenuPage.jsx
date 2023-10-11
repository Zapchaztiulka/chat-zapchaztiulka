import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './styles.css';
import { selectChat } from '../../redux/chat/selectors';
import { MessageTemplate } from '../../components/MessageTemplate';
import { Container } from '../../utils';

export const MenuPage = () => {
  const chat = useSelector(selectChat);

  return (
    <Container>
      <nav className="nav-wrapper">
        <MessageTemplate time={chat?.createdAt} />
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
