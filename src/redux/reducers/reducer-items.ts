import { Types, TypeData } from '../types';
import { TypeCartPizzasList } from '../../types/index';

const initialState:TypeCartPizzasList = {
  pizzas:[],
}

type TypeInitialState = typeof initialState

export const items = (state:TypeInitialState = initialState, action:TypeData):TypeInitialState => {
  switch (action.type) {
    case Types.APP_PIZZAS: {
      return {...state, pizzas:action.pizzas}
    }

    case Types.APP_PLUS_CHECK_PIZZAS: {
      return {
        ...state,
        pizzas:state.pizzas.map((item:any) => {
          return item.id === action.id ? {...item, plusChecked:!item.plusChecked} : item
        })
      }
    }

    default:
      return state
  }
}