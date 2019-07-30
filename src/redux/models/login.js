import { takeEvery, put } from '@redux-saga/core/effects';
import { store } from '../configureStore'
import { tryUserState } from './user'; 
import { getStorage, clearStorage, setStorage } from '@app/services/localStorage'
import * as core from './core';

// Constantes
const TRY_LOGIN = 'login/TRY';
const TRY_LOGIN_END = 'login/TRY_LOGIN_END';
const SET_LOGIN = 'login/SET_LOGIN'
const LOGOUT = 'login/LOGOUT'

// Creadores de acciones (se pueden usar desde los compoenentes)
export const tryLogin = (privateKey, save) =>({ type: TRY_LOGIN, payload: {privateKey, save } });
export const logout = () => ({type: LOGOUT});
export const set = (loginData) =>({ type: SET_LOGIN, payload: loginData});

//Eventos que requieren del async
function* loadLoginData() {
  yield put({type: core.ACTION_START, payload: { login: 'Check local storage'}})
  const { data } = yield getStorage('login');
  if(data.privateKey) {
    yield put(tryLogin(data.privateKey, true))
  }
  yield put({type: core.ACTION_END, payload: 'login'})
}

function* tryLoginSaga({ type, payload }) {
  const defaultUserId = '1';
  const { privateKey, save} = payload
  try {
    if(payload.save) {
      setStorage('login',{privateKey, save})
    }
    yield put(set({userId: defaultUserId, role: 'business'}))
  } catch(e) {
    console.err(e)
  }
  yield put({type: TRY_LOGIN_END})
  yield put( tryUserState (defaultUserId))
}

function* logoutSaga( ) {
  yield clearStorage();
}

//Se envan las sagas a redux estableciendo que y cuantas veces dispara la funcià¸£à¸“n
store.injectSaga('login', [
  takeEvery(core.INIT, loadLoginData),
  takeEvery(TRY_LOGIN, tryLoginSaga),
  takeEvery(LOGOUT, logoutSaga)
]);

// Selectores - Conocen el stado y retornan la info que es necesaria
export const isLoading = (state) => state.login.loading > 0

// El reducer del modelo
const defaultState = { loading: 0, role: undefined, userId: undefined };

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
        userId: action.payload.userId,
        role: action.payload.role,
      }
    case logout:
      return defaultState;
    default: return state;
  }}

  store.injectReducer('login', reducer)