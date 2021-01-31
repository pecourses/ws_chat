import { createStore, applyMiddleware } from 'redux';
import { createSagaMiddleware } from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootMiddleware = applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, rootMiddleware);

sagaMiddleware.run(rootSaga);

export default store;
