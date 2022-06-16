import { TypeData, Types } from '../types';
import { TypeRegister } from './../../types/index';

const initialState:TypeRegister = {
  register:null
}

type TypeInitialState = typeof initialState

export const register = (state = initialState, action:TypeData):TypeInitialState => {
  switch (action.type) {
    case Types.APP_REGISTER: {
      return { ...state, register:action.payload }
    }
    
    default:
      return state
  }
}