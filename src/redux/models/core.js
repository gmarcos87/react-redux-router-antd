import { takeEvery, call, put } from '@redux-saga/core/effects';
import { store } from '@app/redux/configureStore'
// ConstantesT
const INIT = '@@INIT'
const INIT_READY_TO_START = 'core/READY';
export const ACTION_START = 'core/ACTION_START';
export const ACTION_END = 'core/ACTION_END';

const wait = (time, cb) => new Promise((res) => { setTimeout(cb,time); });

function* bootSaga({ type, payload }) {
    yield  call(wait, 500);
    yield put({type: INIT_READY_TO_START})
}

//Se envan las sagas a redux estableciendo que y cuantas veces dispara la funcià¸£à¸“n
store.injectSaga('core', [
  takeEvery(INIT, bootSaga)
])

// Selectores - Conocen el stado y retornan la info que es necesaria
export const isLoading = (state) => state.core.loading
export const pending = (state) => state.core.pending
// El reducer del modelo

const defaultState = { pending: {}, loading: true };
function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case ACTION_START:
        return {
            ...state,
            pending: {
                ...state.pending,
                ...action.payload
            }
        }
    case ACTION_END:
        delete state.pending[action.payload];
        return {
            ...state,
            pending: {
                ...state.pending
            },
            loading: Object.keys(state.pending).length > 0? true: false,
        }
    default: return state;
  }
}

store.injectReducer('core', reducer)