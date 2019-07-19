import { subscribeSagas } from '../sagas';
import * as api from '../../services/todoApi'
import { takeEvery, call, put} from '@redux-saga/core/effects';

// Constantes
const SET = 'todo/SET';
const SET_ASYNC = 'todo/SET_ASYNC';
const SET_ASYNC_END = 'todo/SET_LOADING_END';

// Creadores de acciones (se pueden usar desde los compoenentes)
export const set = (name) =>({ type: SET, payload: name });
export const setAsync = (name) =>({ type: SET_ASYNC, payload: name });

//Eventos que requieren del async
function* setAsyncSaga({ type, payload }) {
  try {
    const remoteLoad = yield call(api.setTodo, payload)
    yield put(set(remoteLoad))
  } catch(e) {
    console.err(e)
  }
  yield put({type: SET_ASYNC_END})
}

//Se envan las sagas a redux estableciendo que y cuantas veces dispara la función
subscribeSagas([
  takeEvery(SET_ASYNC, setAsyncSaga)
])


// Selectores - Conocen el stado y retornan la info que es necesaria
export const isLoading = (state) => state.todo.loading > 0
export const getTodos = (state) => state.todo.todos

// El reducer del modelo
const defaultState = { todos:[], loading: 0 };
export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case SET:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case SET_ASYNC:
      return  {
        ...state,
        loading: state.loading +1
      }
    case SET_ASYNC_END:
      return {
        ...state,
        loading: state.loading - 1
      }
    default: return state;
  }
}