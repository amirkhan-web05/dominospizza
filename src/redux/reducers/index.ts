import { halves } from './reducer-halves';
import { cities } from './reducer-cities';
import { register } from './reducer-register';
import { auth } from './reducer-auth';
import { filters } from './reducer-filters';
import { cart } from './reducer-cart';
import { items } from './reducer-items';
import { combineReducers } from "redux";

export const rootReducers = combineReducers({
  items,
  cart,
  filters,
  auth,
  cities,
  register,
  halves
})
