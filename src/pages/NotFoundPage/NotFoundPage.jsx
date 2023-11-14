import { useNavigate } from 'react-router-dom';
import { Button } from 'universal-components-frontend/src/components';

import './styles.css';
import errorPage from '@/images/404-page.gif';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <img className="image" src={errorPage} alt="" />
      <div className="title">Oops! Page not found</div>
      <Button text="Go back to chat" onClick={() => navigate('/')} />
    </div>
  );
};
