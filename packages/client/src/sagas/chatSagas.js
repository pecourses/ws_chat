import { put } from 'redux-saga/effects';
import { getMessagesRequest, getMessagesSuccess, getMessagesFail } from './../actions/chatActionCreators';
import * as API from './../api';

export function * getMessagesSaga () {
  yield put(getMessagesRequest());

  try {
    const { data: { data: messages } } = yield API.getMessages();
    yield put(getMessagesSuccess(messages));
  } catch (error) {
    yield put(getMessagesFail(error));
  }
}

export function * newMessageSaga ({ payload: { data } }) {
  yield API.sendMessage(data);
}
