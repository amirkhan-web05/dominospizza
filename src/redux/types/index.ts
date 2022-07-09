import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from '../store';
import { actions } from './../actions/action-creators';

export enum Types {
  APP_PIZZAS = 'APP/PIZZAS',
  APP_SNACK = 'APP/SNACK',
  APP_CART = 'APP/CART',
  APP_ADD_TO_CART = 'APP/ADD/TO/CART',
  APP_REMOVE_CART = 'APP/REMOVE/CART',
  APP_PLUS_CART = 'APP/PATCH/CART',
  APP_PLUS_CHECK_CART = 'APP/PLUS/CHECK/CART',
  APP_PLUS_CHECK_PIZZAS = 'APP/PLUS/CHECK/PIZZAS',
  APP_LOADED = 'APP/LOADED',
  APP_SORT_BY = 'APP/SORT/BY',
  APP_CATEGORY_BTN = 'APP/CATEGORY/BTN',
  APP_AUTH = 'APP/AUTH',
  APP_AUTH_LOADING = 'APP/AUTH/LOADING',
  APP_AUTH_LOGOUT = 'APP/AUTH/LOGOUT',
  APP_REGISTER = 'APP/REGISTER',
  APP_CITIES = 'APP/CITIES',
  APP_UPDATE_CART = 'APP/UPDATE/CART',
  APP_HALVES = 'APP/HALVES',
  APP_HALVES_ITEMS = 'APP/HALVES/ITEMS',
  APP_FILTERS = 'APP/FILTERS',
  APP_MINUS_CART = 'APP/MINUS/PATCH',
  APP_ORDERS = 'APP/ORDERS',
  APP_CLEAR_CART = 'APP/CLEAR/CART'
}

type InferValueTypes<T> = T extends {[key:string]:infer U} ? U : never
export type TypeData = ReturnType<InferValueTypes<typeof actions>>
export type DispatchType = Dispatch<TypeData>
export type TypeThunkAction = ThunkAction<void, AppStateType, unknown, TypeData>