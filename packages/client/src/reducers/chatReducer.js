import ACTION_TYPES from './../actions/types';
import { produce } from 'immer';

const initialState = {
  messages: [],
  limit: 60,
  isFetching: false,
  error: null
};

const chatReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case ACTION_TYPES.GET_MESSAGES_REQUEST: {
      return produce(state, draftState => {
        draftState.isFetching = true;
      });
    }
    case ACTION_TYPES.GET_MESSAGES_SUCCESS: {
      const { payload: { data } } = action;
      return produce(state, draftState => {
        draftState.messages = [...data];
        draftState.isFetching = false;
      });
    }
    case ACTION_TYPES.GET_MESSAGES_FAIL: {
      const { payload: { error } } = action;
      return produce(state, draftState => {
        draftState.error = error;
        draftState.isFetching = false;
      });
    }
    /// 5 9 6 3
    /// 9 6 3
    case ACTION_TYPES.NEW_MESSAGE_SUCCESS: {
      const { payload: { data } } = action;
      return produce(state, draftState => {
        if (draftState.messages.length >= draftState.limit) {
          draftState.messages = [
            ...draftState.messages.slice(1),
            data
          ];
        } else {
          draftState.messages.push(data);
        }
      });
    }
    case ACTION_TYPES.NEW_MESSAGE_FAIL: {
      const { payload: { error } } = action;
      return produce(state, draftState => {
        draftState.error = error;
      });
    }
    default:
      return state;
  }
};

export default chatReducer;
