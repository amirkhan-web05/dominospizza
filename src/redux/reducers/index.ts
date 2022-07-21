import { orders } from './orders/reducer-orders';
import { snacks } from '././snacks/reducer-snacks';
import { halves } from '././halves/reducer-halves';
import { cities } from '././cities/reducer-cities';
import { register } from '././register/reducer-register';
import { auth } from '././auth/reducer-auth';
import { filters } from '././filters/reducer-filters';
import { cart } from '././cart/reducer-cart';
import { pizzas } from '././pizzas/reducer-items';
import { combineReducers } from "redux";

export const rootReducers = combineReducers({
  pizzas,
  cart,
  filters,
  orders,
  auth,
  cities,
  register,
  halves,
  snacks
})
