import { instance } from './api';
import { TypeOrders } from './../types/index';

export const ordersAPI = {
  postOrders(orders:TypeOrders | null) {
    return instance.post<TypeOrders | null>('/orders', orders)
  }
}