import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = 'https://spares-backend-i2mq.onrender.com/api';
axios.defaults.baseURL = 'http://localhost:5000/api';

export const createChatRoom = createAsyncThunk(
  'chat',
  async (userId, thunkAPI) => {
    try {
      const { data } = await axios.post('/chats', { userId });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const closeChat = createAsyncThunk(
  'chat/closeChat',
  async (chatRoomId, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/chats/${chatRoomId}`);
      return data.message;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
