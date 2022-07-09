import { actions } from './action-creators';
import { AxiosResponse } from 'axios';
import { ordersAPI } from '../../api/orders-api';
import { DispatchType, TypeThunkAction } from '../types';
import { TypeOrders } from './../../types/index';

export const fetchOrders = (orders:TypeOrders):TypeThunkAction => (dispatch:DispatchType) => {
 ordersAPI.postOrders(orders).then(({data}:AxiosResponse<TypeOrders>) => {
  dispatch(actions.setOrders(data))
 }) 
}