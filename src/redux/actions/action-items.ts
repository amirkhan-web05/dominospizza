import { AxiosResponse } from 'axios';
import { TypeCategoryBtn, TypeCartItems, TypeCitiesModal, TypeHalvesItems } from './../../types/index';
import { TypeSort } from './../../api/items-api';
import { actions } from './action-creators';
import { DispatchType, TypeThunkAction } from './../types/index';
import { itemsAPI } from '../../api/items-api';

export const fetchPizzas = (sortBy:TypeSort, category:TypeCategoryBtn):TypeThunkAction => async (dispatch:DispatchType) => {
  try {
    await itemsAPI.getItems(sortBy, category).then(({data}:AxiosResponse<TypeCartItems[]>) => {
      dispatch(actions.setItems(data))   
    })
  } catch (e) {
    alert(e)
  }
}

export const fetchCities = (name:string):TypeThunkAction => async (dispatch:DispatchType) => {
  try {
    await itemsAPI.getCities(name).then(({data}:AxiosResponse<TypeCitiesModal[]>) => {
      dispatch(actions.setCities(data))
    })
  } catch (e) {
    alert(e)
  }
}

export const fetchHalves = ():TypeThunkAction => async (dispatch:DispatchType) => {
  try {
    await itemsAPI.getHalves().then(({data}:AxiosResponse<TypeHalvesItems[]>) => {
      dispatch(actions.setHalves(data))
    })
  } catch (e) {
    alert(e)
  }
}

