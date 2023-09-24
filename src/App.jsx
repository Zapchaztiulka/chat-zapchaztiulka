import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// import socketIO from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import PrivateRoute from 'routes/PrivateRoute';
// import PublicRoute from 'routes/PublicRoute';

import { Loader } from './components/Loader';
import { Header } from './components/NavBar';

const MenuPage = lazy(() => import('./pages/MenuPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const OrderDetailsPage = lazy(() => import('./pages/OrderDetailsPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const ButtonExamples = lazy(() => import('./pages/ButtonExamples.jsx')); // видалити

// const socket = socketIO.connect('https://spares-backend-i2mq.onrender.com');

export const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<MenuPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/order-details" element={<OrderDetailsPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/buttons" element={<ButtonExamples />} />
          </Route>
        </Routes>
        <ToastContainer autoClose={3000} />
      </Suspense>
    </>
  );
};
