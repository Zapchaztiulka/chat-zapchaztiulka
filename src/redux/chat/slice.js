import { createSlice } from '@reduxjs/toolkit';
import { authUser, createChatRoom, closeChatRoom } from './operations';
import { updateUserStatus } from './actions';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
  state.isOnline = false;
};

const initialState = {
  userId: null,
  username: null,
  userPhone: null,
  token: null,
  isOnline: false,
  chatRooms: [],
  createdAt: null,
  isLoading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(authUser.pending, handlePending)
      .addCase(authUser.fulfilled, (state, { payload }) => {
        Object.assign(state, payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(authUser.rejected, handleRejected)

      .addCase(createChatRoom.pending, handlePending)
      .addCase(createChatRoom.fulfilled, (state, { payload }) => {
        state.chatRooms.push(payload);
        state.isOnline = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createChatRoom.rejected, handleRejected)

      .addCase(closeChatRoom.pending, handlePending)
      .addCase(closeChatRoom.fulfilled, (state, { payload }) => {
        const roomIndex = state.chatRooms.findIndex(
          room => room._id === payload.roomId
        );

        if (roomIndex !== -1) {
          state.chatRooms[roomIndex].chatRoomStatus = 'completed';
        }

        state.isOnline = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(closeChatRoom.rejected, handleRejected)

      .addCase(updateUserStatus, (state, { payload }) => {
        state.isOnline = payload.isOnline;
      });
  },
});

export const chatReducer = chatSlice.reducer;