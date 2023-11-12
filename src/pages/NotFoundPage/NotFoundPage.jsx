import './styles.css';
import { PrimaryBtn } from '@/components/Button';
import errorPage from '@/images/404-page.gif';

export const NotFoundPage = () => {
  return (
    <div className="wrapper">
      <img className="image" src={errorPage} alt="" />
      <div className="title">Oops! Page not found</div>
      <PrimaryBtn to="/">Go back to chat</PrimaryBtn>
    </div>
  );
};
