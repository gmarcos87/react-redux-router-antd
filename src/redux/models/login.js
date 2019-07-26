import { takeEvery, put } from '@redux-saga/core/effects';
import { store } from '../configureStore'

// Constantes
const TRY_LOGIN = 'login/TRY';
const TRY_LOGIN_END = 'login/TRY_LOGIN_END';
const SET_LOGIN = 'login/SET_LOGIN'

// Creadores de acciones (se pueden usar desde los compoenentes)
export const tryLogin = (privateKey) =>({ type: TRY_LOGIN, payload: privateKey });
export const set = (loginData) =>({ type: SET_LOGIN, payload: loginData});

//Eventos que requieren del async
function* tryLoginSaga({ type, payload }) {
  try {
    yield put(set({someData: {}, role: 'business'}))
  } catch(e) {
    console.err(e)
  }
  yield put({type: TRY_LOGIN_END})
}

//Se envan las sagas a redux estableciendo que y cuantas veces dispara la funcià¸£à¸“n
store.injectSaga('login', [
  takeEvery(TRY_LOGIN, tryLoginSaga)
]);

// Selectores - Conocen el stado y retornan la info que es necesaria
export const isLoading = (state) => state.login.loading > 0

// El reducer del modelo
const defaultState = { loading: 0, role: undefined };
function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case TRY_LOGIN:
      return  {
        ...state,
        loading: state.loading +1
      }
    case TRY_LOGIN_END:
      return {
        ...state,
        loading: state.loading - 1
      }
    case SET_LOGIN: 
      return {
        ...state,
        info: action.payload.someData,
        role: action.payload.role,
      }
    default: return state;
  }}

  store.injectReducer('login', reducer)