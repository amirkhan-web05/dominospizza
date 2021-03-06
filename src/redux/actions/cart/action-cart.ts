import { AxiosResponse } from 'axios';
import { TypeCartItems } from '../../../types/index';
import { actions } from '../creators/action-creators';

import { DispatchType, TypeThunkAction } from '../../types/index';
import { cartAPI } from '../../../api/cart-api';

export const fetchGetCart = ():TypeThunkAction => {
  return async (dispatch:DispatchType) => {
    try {
      await cartAPI.getCart().then(({data}:AxiosResponse<TypeCartItems[]>) => {
        dispatch(actions.setCart(data))
      })
    } catch (e) {
      alert(e)
    }
  }
}

// крч setCart добавляет сверху еще массив

export const fetchPostCart = (items:TypeCartItems):TypeThunkAction => {
  return async (dispatch:DispatchType) => {
    try {
      dispatch(actions.setLoading(true))
      await cartAPI.postCart(items).then(() => {
        dispatch(actions.setAddCart(items))
      }).finally(() => {
        dispatch(actions.setLoading(false))
      })
    } catch (e) {
      alert(e)
    }
  }
}

export const fetchDeleteCart = (id:number):TypeThunkAction => { 
  return async (dispatch:DispatchType) => {
    try {
      await cartAPI.deleteCart(id).then(() => {
        dispatch(actions.setRemoveCart(id))
      })
    } catch (e) {
      alert(e)
    }
  }
}

export const fetchPlusCart = (id:number, count:number):TypeThunkAction => {
  return async (dispatch:DispatchType) => {
    try {
      await cartAPI.patchPlusCart(id, count).then(() => {
        dispatch(actions.setPlusCart(id, count))
      })
    } catch (e) {
      alert(e)
    }
  }
}

export const fetchMinusCart = (id:number, count:number):TypeThunkAction => {
  return async (dispatch:DispatchType) => {
    try {
      await cartAPI.patchMinusCart(id, count).then(() => {
        dispatch(actions.setMinusCart(id, count))
      })
    } catch (e) {
      alert(e)
    }
  }
}

export const fetchClearCart = ():TypeThunkAction => (dispatch) => {
  cartAPI.deleteClear().then(() => {
    dispatch(actions.setClear())
  })
}