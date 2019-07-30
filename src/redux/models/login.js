import { takeEvery, put } from '@redux-saga/core/effects';
import { store } from '../configureStore'
import { tryUserState } from './user'; 
import { getStorage } from '@app/services/localStorage'
import * as core from './core';

// Constantes
const TRY_LOGIN = 'login/TRY';
const TRY_LOGIN_END = 'login/TRY_LOGIN_END';
const SET_LOGIN = 'login/SET_LOGIN'

// Creadores de acciones (se pueden usar desde los compoenentes)
export const tryLogin = (privateKey) =>({ type: TRY_LOGIN, payload: privateKey });
export const set = (loginData) =>({ type: SET_LOGIN, payload: loginData});

//Eventos que requieren del async
function* loadLoginData() {
  yield put({type: core.ACTION_START, payload: { login: 'Check local storage'}})
  const { data } = yield getStorage('userData');
  if(data) {
    yield put(set(data))
  }
  yield put({type: core.ACTION_END, payload: 'login'})
}

function* tryLoginSaga({ type, payload }) {
  const defaultUserId = '1';
  try {
    yield put(set({userId: defaultUserId, role: 'business'}))
  } catch(e) {
    console.err(e)
  }
  yield put({type: TRY_LOGIN_END})
  yield put( tryUserState (defaultUserId))
}

//Se envan las sagas a redux estableciendo que y cuantas veces dispara la funcià¸£à¸“n
store.injectSaga('login', [
  takeEvery(core.INIT, loadLoginData),
  takeEvery(TRY_LOGIN, tryLoginSaga)
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
    default: return state;
  }}

  store.injectReducer('login', reducer)