import { createSlice } from '@reduxjs/toolkit';
import { createChatRoom, closeChat } from './operations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const initialState = {
  chatRoom: {
    userId: '',
    username: '',
    userPhone: '',
    managerId: '',
    messages: [
      {
        messageOwner: '',
        message: '',
      },
    ],
    chatStatus: null,
    chatRating: 0,
    chatFeedback: '',
    createdAt: null,
    updatedAt: null,
    token: null,
  },
  isLoading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(createChatRoom.pending, handlePending)
      .addCase(createChatRoom.fulfilled, (state, { payload }) => {
        state.chatRoom = {
          ...state.chatRoom,
          ...payload,
        };
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createChatRoom.rejected, handleRejected)

      .addCase(closeChat.pending, handlePending)
      .addCase(closeChat.fulfilled, state => {
        state.chatRoom.chatStatus = 'completed';
        state.isLoading = false;
        state.error = null;
      })
      .addCase(closeChat.rejected, handleRejected);
  },
});

export const chatReducer = chatSlice.reducer;
