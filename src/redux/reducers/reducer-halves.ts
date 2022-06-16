import { TypeData, Types } from '../types';
import { TypeHalvesPizzasList } from './../../types/index';

const initialState:TypeHalvesPizzasList = {
  halves:[]
}

type TypeInitialState = typeof initialState

export const halves = (state = initialState, action:TypeData):TypeInitialState => {
  switch (action.type) {
    case Types.APP_HALVES: {
      return {...state, halves:action.halves}
    }

    case Types.APP_HALVES_ITEMS: {
      return {...state, halves:state.halves.map(item => {
        return item.id === action.id ? {...item, isHalves:!item.isHalves} : item
      })}
    }
    
    default:
      return state
  }
}