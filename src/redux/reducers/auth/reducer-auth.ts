import { TypeAuth } from './../../../types/index';
import { TypeData, Types } from './../../types/index';

const initialState:TypeAuth = {
  auth:JSON.parse(localStorage.getItem('accessToken') as any || null),
  loading:true,
  isAuth:false
}

type TypeInitialState = typeof initialState

export const auth = (state:TypeInitialState = initialState, action:TypeData):TypeInitialState => {
  switch (action.type) {
    case Types.APP_AUTH: {
      return {...state, auth:action.payload, isAuth:true}
    }

    case Types.APP_AUTH_LOADING: {
      return {...state, loading:action.payload}
    }

    case Types.APP_AUTH_LOGOUT: {
      return {...state, auth:null}
    }

    case Types.APP_IN_LOGOUT: {
      return {...state, auth:action.auth}
    }
    
    default:
      return state
  }
}