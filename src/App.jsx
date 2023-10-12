import { Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socketIO from 'socket.io-client';
import { nanoid } from 'nanoid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Loader } from './components/Loader';
import { Header } from './components/Header';

const MenuPage = lazy(() => import('./pages/MenuPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const OrderDetailsPage = lazy(() => import('./pages/OrderDetailsPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

import { authUser } from './redux/chat/operations';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const App = () => {
  const socket = socketIO.connect(BACKEND_URL);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userIdParam = searchParams.get('userId');
    const storedUserId = localStorage.getItem('userId') || nanoid(24);

    if (userIdParam) {
      localStorage.setItem('userId', userIdParam);
      dispatch(authUser(userIdParam));
    } else {
      localStorage.setItem('userId', storedUserId);
      dispatch(authUser(storedUserId));
    }
  }, [dispatch, location.search]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Header socket={socket} />}>
            <Route index element={<MenuPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/order-details" element={<OrderDetailsPage />} />
            <Route path="/chat" element={<ChatPage socket={socket} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <ToastContainer autoClose={3000} />
      </Suspense>
    </>
  );
};
