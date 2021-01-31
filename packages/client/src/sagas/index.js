import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from './../actions/types';
import { getMessagesSaga, newMessageSaga } from './chatSagas';

function * rootSaga () {
  yield takeLatest(ACTION_TYPES.GET_MESSAGES_ACTION, getMessagesSaga);
  yield takeLatest(ACTION_TYPES.NEW_MESSAGE_ACTION, newMessageSaga);
}

export default rootSaga;
