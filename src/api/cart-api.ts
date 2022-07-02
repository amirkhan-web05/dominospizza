import { instance } from './api';
import { TypeCartItems } from './../types/index';

export const cartAPI = {
  getCart() {
    return instance.get<TypeCartItems[]>('/cart')
  },
  postCart(items:TypeCartItems) {
    return instance.post<TypeCartItems>('/cart', items)
  },
  deleteCart(id:number) {
    return instance.delete<number>(`/cart/${id}`)
  },
  patchPlusCart(id:number, count:number) {
    return instance.patch<number>(`/cart/${id}`, {
      count
    })
  },
  patchMinusCart(id:number, count:number) {
    return instance.patch<number>(`/cart/${id}`, {
      count
    })
  }
}