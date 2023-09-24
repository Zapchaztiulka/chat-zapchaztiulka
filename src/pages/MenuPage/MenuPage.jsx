import { NavLink } from 'react-router-dom';
import './styles.css';

export const MenuPage = () => {
  return (
    <nav className="nav-wrapper">
      <div className="welcome">
        <p>Вітаємо!</p>
        <p> Оберіть будь ласка дію зі списка:</p>
      </div>
      <NavLink className="nav-link" to="/faq">
        FAQ
      </NavLink>
      <NavLink className="nav-link" to="/order-details">
        Деталі замовлення
      </NavLink>
      <NavLink className="nav-link" to="/chat">
        Чат з менеджером
      </NavLink>
      <NavLink className="nav-link" to="/buttons">
        Приклади кнопок
      </NavLink>
    </nav>
  );
};
