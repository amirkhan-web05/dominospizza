import { instance } from './api';
import { TypeOrders } from './../types/index';

export const ordersAPI = {
  postOrders(orders:TypeOrders) {
    return instance.post<TypeOrders>('/orders', orders)
  }
}