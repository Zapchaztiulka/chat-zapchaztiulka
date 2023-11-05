// import { configureStore } from '@reduxjs/toolkit';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import { chatReducer } from './chat/slice';

// const chatPersistConfig = {
//   key: 'chat',
//   storage,
// };

// export const store = configureStore({
//   reducer: {
//     chat: persistReducer(chatPersistConfig, chatReducer),
//   },
//   middleware: getDefaultMiddleware => [
//     ...getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
//   ],
// });

// export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit';

import { chatReducer } from './chat/slice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
