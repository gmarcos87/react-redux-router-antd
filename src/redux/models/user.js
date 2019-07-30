import { takeEvery, put } from '@redux-saga/core/effects';
import { store } from '../configureStore'
import * as api from '@app/services/inkiriApi';

// Constantes
const TRY_USERSTATE     = 'userstate/TRY';
const TRY_USERSTATE_END = 'userstate/TRY_USERSTATE_END';
const SET_USERSTATE     = 'userstate/SET_USERSTATE'

// El usuario ya esta logeado
// Creadores de acciones (se pueden usar desde los compoenentes)
export const tryUserState  = (accountName) =>({ type: TRY_USERSTATE, payload: accountName });
export const setUserState  = (userStateData) =>({ type: SET_USERSTATE, payload: userStateData});

// El reducer del modelo
const defaultState = { loading: 0, accounts: [] };

// Selectores - Conocen el estado y retornan la info que es necesaria
export const isLoading         = (state) => state.user.loading > 0
export const defaultAccount    = (state) => (state.user.accounts && state.user.accounts.length>0) ? state.user.accounts[0] : undefined
export const allAccounts       = (state) => (state.user.accounts || [])

function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case TRY_USERSTATE:
      return  {
        ...state,
        loading: state.loading + 1
      }
    case TRY_USERSTATE_END:
      return {
        ...state,
        loading: state.loading - 1
      }
    case SET_USERSTATE: 
      return {
        ...state,
        accounts: action.payload.accounts,
      }
    default: return state;
  }}

//Eventos que requieren del async
function* tryLoadUserStateSaga({ type, payload }) {
  try {
    console.log('tryLoadUserStateSaga')
    console.log(JSON.stringify(payload)); 
    const res = yield api.getAccountInformation(payload);
    console.log(JSON.stringify(res)); 
    // assert res.data.accounts
    
    yield put(setUserState({accounts: res.data.accounts}))

  } catch(e) {
    console.log(e)
  }
  yield put({type: TRY_USERSTATE_END})
}


//Se envan las sagas a redux estableciendo que y cuantas veces dispara la funcià¸£à¸“n
store.injectSaga('user', [
  takeEvery(TRY_USERSTATE, tryLoadUserStateSaga)
]);


store.injectReducer('user', reducer)