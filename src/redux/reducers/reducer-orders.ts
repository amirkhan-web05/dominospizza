import { TypeOrdersList } from './../../types/index';
import { TypeData, Types } from './../types/index';

const initialState:any = {
  orders:[]
}

type TypeInitialState = typeof initialState

export const orders = (state:TypeInitialState = initialState, action:TypeData):TypeInitialState => {
  switch (action.type) {
    case Types.APP_ORDERS: {
      return {
        ...state,
        orders:action.orders
      }
    }

    default: {
      return state
    }
  }
}