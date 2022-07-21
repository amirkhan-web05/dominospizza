import { RootState } from './../store';

export const selectPizzaData = (state:RootState) => state.pizzas
export const selectSnackData = (state:RootState) => state.snacks
export const selectCartData = (state:RootState) => state.cart
export const selectOrderData = (state:RootState) => state.orders;
export const selectCityData = (state:RootState) => state.cities
export const selectFilterData = (state:RootState) => state.filters;
export const selectAuthData = (state:RootState) => state.auth
export const selectRegister = (state:RootState) => state.register;
