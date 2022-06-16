import { TypeCitiesModalList } from './../../types/index';
import { TypeData, Types } from './../types/index';

const initialState:TypeCitiesModalList = {
  cities:[]
}

type TypeInitialState = typeof initialState

export const cities = (state:TypeInitialState = initialState, action:TypeData):TypeInitialState => {
  switch (action.type) {
    case Types.APP_CITIES: {
      return {...state, cities:action.cities}
    }

    default:
      return state
  }
}