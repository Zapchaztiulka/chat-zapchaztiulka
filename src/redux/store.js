import { configureStore } from '@reduxjs/toolkit';

import { chatReducer } from './chat/slice';
import { faqReducer } from './faq/slice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    faq: faqReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
