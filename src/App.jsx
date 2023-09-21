// import socketIO from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import PrivateRoute from 'routes/PrivateRoute';
// import PublicRoute from 'routes/PublicRoute';

import { Loader } from './components/Loader';

// const socket = socketIO.connect('http://localhost:5000');

export const App = () => {
  return (
    <>
      <h1>Vite + React</h1>
      <Loader isVisible />
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        position="top-right"
      />
    </>
  );
};
