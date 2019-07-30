import { takeEvery, put, call } from '@redux-saga/core/effects';
import { store } from '../configureStore'
import { getAvailableAccounts } from '@app/services/inkiriApi'
import * as core from './core';

// Constantes
const LOAD_ACCOUNTS = 'accounts/LOAD_ACCOUNTS'
const SET_ACCOUNTS = 'accounts/SET_ACCOUNTS'

// Creadores de acciones (se pueden usar desde los compoenentes)
export const loadAccunts = () =>({ type: LOAD_ACCOUNTS });
export const setAccunts = (accounts = []) =>({ type: SET_ACCOUNTS, payload: {accounts}});

//Eventos que requieren del async
function* loadAccounts() {
  const {data} = yield getAvailableAccounts();
  if(data) {
    yield put(setAccunts(data.accounts))
  }
}

function* initLoadAccounts () {
  yield put({type: core.ACTION_START, payload: { loadAccounts: 'Loading accounts'}})
  yield call(loadAccounts)
  yield put({type: core.ACTION_END, payload: 'loadAccounts'})
}

//Se envan las sagas a redux estableciendo que y cuantas veces dispara la funcià¸£à¸“n
store.injectSaga('accounts', [
  takeEvery(core.INIT, initLoadAccounts),
  takeEvery(LOAD_ACCOUNTS, loadAccounts),
]);

// Selectores - Conocen el stado y retornan la info que es necesaria
export const accounts = (state) => state.accounts || []

// El reducer del modelo
const defaultState = [];

function reducer(state = defaultState, action = {}) {
  switch (action.type) {

    case SET_ACCOUNTS: 
      return  [...action.payload.accounts]

    default: return state;
  }
}

  store.injectReducer('accounts', reducer)