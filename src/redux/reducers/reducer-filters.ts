import { TypeParams } from './../../types/index';
import { TypeData, Types } from './../types/index';

const initialState:TypeParams = {
  sortBy: {
    type:'',
    order:'',
    name:''
  },
  categoryBtn: {
    id:1,
    category:'',
    completed:false
  },
}

type TypeInitialState = typeof initialState

export const filters = (state = initialState, action:TypeData):TypeInitialState => {
  switch (action.type) {
    case Types.APP_SORT_BY: {
      return {...state, sortBy:action.payload}
    }

    case Types.APP_CATEGORY_BTN: {
      return {...state, categoryBtn:action.categoryBtn}
    }

    case Types.APP_FILTERS: {
      return {
        ...state, 
        sortBy:action.filters.sortBy,
        categoryBtn:action.filters.categoryBtn, 
      }
    }

    default:
      return state
  }
}