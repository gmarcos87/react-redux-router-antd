import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import todo from './models/todo';
import menu from './models/menu';
import login from './models/login';

const reducers = combineReducers({
  todo,
  menu,
  login
});


const sagaMiddleware = createSagaMiddleware()

const createStoreWithMiddleware = composeWithDevTools(
  applyMiddleware(sagaMiddleware)
)(createStore); 

const configureStore = (initialState) => {
  const store = createStoreWithMiddleware(reducers, initialState);
    sagaMiddleware.run(rootSaga)
  return store;
}

export default configureStore;