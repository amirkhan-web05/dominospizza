import { TypeCategoryBtn, TypeAuthUser, TypeCitiesModal, TypeHalvesItems, TypeAuthMaterial, TypeParams, TypeSnackItems } from './../../types/index';
import { TypeCartItems } from "../../types";
import { Types } from "../types";
import { TypeSort } from '../../api/items-api';

export const actions = {
  setAddCart:(cart:TypeCartItems) => ({type:Types.APP_ADD_TO_CART,cart} as const),
  setItems:(pizzas:TypeCartItems[]) => ({type:Types.APP_PIZZAS,pizzas} as const),
  setRemoveCart:(id:number) => ({type:Types.APP_REMOVE_CART, id} as const),
  setCart:(cart:TypeCartItems[]) => ({type:Types.APP_CART, cart} as const),
  setHalvesItems:(id:number) => ({type:Types.APP_HALVES_ITEMS, id} as const),
  setFilters:(filters:TypeParams) => ({type:Types.APP_FILTERS, filters} as const),
  setSnacks:(snacks:TypeSnackItems[]) => ({type:Types.APP_SNACK, snacks} as const),
  setHalves:(halves:TypeHalvesItems[]) => ({type:Types.APP_HALVES, halves} as const),
  setCheckedPlusCart: (id:number) => ({type:Types.APP_PLUS_CHECK_CART, id} as const),
  setMinusCart:(id:number, count:number) => ({type:Types.APP_MINUS_CART, id, count} as const),
  setSortBy:(sortBy:TypeSort) => ({type:Types.APP_SORT_BY, payload:sortBy} as const),
  setAuthLoading:(loading:boolean) => ({type:Types.APP_AUTH_LOADING, payload:loading} as const), 
  setRegister:(data:TypeAuthMaterial) => ({type:Types.APP_REGISTER, payload:data} as const),
  setCities:(cities:TypeCitiesModal[]) => ({type:Types.APP_CITIES, cities} as const),
  setAuth:(data:TypeAuthUser[] | null) => ({type:Types.APP_AUTH, payload:data} as const),
  setLogout:(user:any) => ({type:Types.APP_AUTH_LOGOUT, payload:null} as const),
  setCategoryBtn:(categoryBtn:TypeCategoryBtn) => ({type:Types.APP_CATEGORY_BTN, categoryBtn} as const),
  setLoading: (isLoaded:boolean) => ({type:Types.APP_LOADED, payload:isLoaded} as const),
  setCheckedPlusPizzas: (id:number) => ({type:Types.APP_PLUS_CHECK_PIZZAS, id} as const),
  setPlusCart: (id:number, count:number) => ({type:Types.APP_PLUS_CART, id, count} as const)
}