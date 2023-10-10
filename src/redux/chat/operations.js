import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const authUser = createAsyncThunk(
  'chat/authUser',
  async (userId, thunkAPI) => {
    try {
      const { data } = await axios.post('/chats/auth', { userId });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const createChatRoom = createAsyncThunk(
  'chat/createChatRoom',
  async (userId, thunkAPI) => {
    try {
      const { data } = await axios.post('/chats/chatRoom', { userId });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const closeChatRoom = createAsyncThunk(
  'chat/closeChat',
  async ({ chatRoomId, userId }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/chats/chatRoom/${chatRoomId}`, {
        userId,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
