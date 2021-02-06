import axios from 'axios';
import { io } from 'socket.io-client';
import { newMessageFail, newMessageSuccess } from '../actions/chatActionCreators';
import store from '../store';

// ws

const wsBaseURL = 'ws://192.168.1.148:5000';
const socket = io(wsBaseURL);

const CHAT_EVENTS = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  NEW_MESSAGE_ERROR: 'NEW_MESSAGE_ERROR'
};

socket.on(CHAT_EVENTS.NEW_MESSAGE, body => {
  const data = JSON.parse(body);
  store.dispatch(newMessageSuccess(data));
});

socket.on(CHAT_EVENTS.NEW_MESSAGE_ERROR, err => {
  const error = JSON.parse(err);
  store.dispatch(newMessageFail(error));
});

export const sendMessage = data => {
  socket.emit(CHAT_EVENTS.NEW_MESSAGE, JSON.stringify(data));
};

// http
const apiInstance = axios.create({ baseURL: 'http://192.168.1.148:5000/api' });

export const getMessages = () => apiInstance.get('/messages');
