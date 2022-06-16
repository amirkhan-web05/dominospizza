import { TypeCartList } from './../../types/index';
import { Types, TypeData } from './../types/index';

const initialState:TypeCartList = {
  cart:[],
  isLoaded:false
}

type TypeInitialState = typeof initialState

export const cart = (state:TypeInitialState = initialState, action:TypeData):TypeInitialState => {
  switch (action.type) {
    
    case Types.APP_CART: {
      return {...state, cart:action.cart}
    }

    case Types.APP_ADD_TO_CART: {
      return {
        ...state, 
        cart:[...state.cart, action.cart]
      }
    }

    case Types.APP_REMOVE_CART: {
      return {
        ...state,
        cart:state.cart.filter(item => item.id !== action.id)
      }
    }

    case Types.APP_PATCH_CART: {
      return {
        ...state,
        cart:state.cart.map(item => {
          if (item.id === action.id) {
            item.count += 1
          }

          return item
        })
      }
    }

    case Types.APP_PLUS_CHECK_CART: {
      return {
        ...state,
        cart:state.cart.map(item => {
          return item.id === action.id ? {...item, plusChecked:!item.plusChecked} : item
        })
      }
    }

    case Types.APP_LOADED: {
      return {...state, isLoaded:action.payload}
    }
    
    default:
      return state
  }
}