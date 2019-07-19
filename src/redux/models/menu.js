import { subscribeSagas } from '../sagas';
import * as api from '../../services/userApi'
import { getRoutesByRole } from '../../services/routes'
import { takeEvery, call, put} from '@redux-saga/core/effects';

// ConstantesT
const GET_ASYNC = 'menu/GET_ASYNC';
const GET_ASYNC_END = 'menu/GET_ASYNC_END';
const GET_FAIL = 'menu/GET_FAIL';
const SET = 'menu/SET';
const CLEAN_MENU = ' menu/CLEAN_MENU'

// Creadores de acciones (se pueden usar desde los compoenentes)
export const getMenu = (userId) =>({ type: GET_ASYNC, payload: { userId }});
export const getMenuFail = (error) =>({ type: GET_FAIL, payload: { error }});
export const setMenu = ({ role, menu }) =>({ type: SET, payload: { role, menu }});
export const cleanMenu = () =>({ type: CLEAN_MENU });

//Eventos que requieren del async
function* getMenuSaga({ type, payload }) {
  try {
    const {error, data } = yield call(api.getRole, payload.userId)
    console.log({error,data, payload})
    if (typeof error === 'undefined') {
      yield put(setMenu({ role: data.role, menu: getRoutesByRole( data.role )}))
    }
    else {
      yield put(getMenuFail(error))
    }
  } catch(error) {
    yield put(getMenuFail(error))
  }
  yield put({type: GET_ASYNC_END})
}

//Se envan las sagas a redux estableciendo que y cuantas veces dispara la funciรณn
subscribeSagas([
  takeEvery(GET_ASYNC, getMenuSaga)
])


// Selectores - Conocen el stado y retornan la info que es necesaria
export const isLoading = (state) => state.menu.loading > 0
export const getMenuItems = (state) => state.menu.items

// El reducer del modelo
const defaultState = { items: [], loading: 0, error: undefined };
export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case SET:
      return {
        ...state,
        items: action.payload.menu
      };
    case GET_ASYNC:
      return  {
        ...state,
        loading: state.loading +1
      }
    case GET_FAIL:
        return {
          ...state,
          error: action.payload.error
        }
    case GET_ASYNC_END:
      return {
        ...state,
        loading: state.loading - 1
      }
    case CLEAN_MENU:
      return defaultState
    default: return state;
  }
}