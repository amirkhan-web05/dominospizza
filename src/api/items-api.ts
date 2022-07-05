import { TypeCategoryBtn, TypeHalvesItems, TypeCitiesModal, TypeSnackItems } from './../types/index';
import { instance } from './api';
import { TypeCartItems } from "../types"

export type TypeSort = {
  name:string
  type:string
  order:string
}

export const itemsAPI = {
  getItems(sortBy:TypeSort, categoryBtn:TypeCategoryBtn) {
    return instance.get<TypeCartItems[]>(`/pizzas?_sort=${sortBy.type}&_order=${sortBy.order}&${categoryBtn.category ? `category=${categoryBtn.category}` : ''}`)
  },
  getCities(name:string) {
    return instance.get<TypeCitiesModal[]>(`/cities?q=${name}`) 
  },
  getHalves() {
    return instance.get<TypeHalvesItems[]>('/halves')
  },
  getSnacks() {
    return instance.get<TypeSnackItems[]>('/snacks')
  }
}