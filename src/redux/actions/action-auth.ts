import { AxiosResponse } from 'axios';
import { actions } from './action-creators';
import { TypeAuthMaterial, TypeAuthUser } from './../../types/index';
import { authAPI } from "../../api/auth-api"
import { DispatchType, TypeThunkAction } from '../types';

export const fetchAuth = ():TypeThunkAction => (dispatch:DispatchType) => {
  try {
    dispatch(actions.setAuthLoading(true))
    authAPI.me().then(({data}:AxiosResponse<TypeAuthUser[]>) => {
      const findUser = data.find((item:TypeAuthUser) => item.password && item.email && item.username)
      if (findUser) {
        dispatch(actions.setAuth(data))
      }
      dispatch(actions.setAuthLoading(false))
    })
  } catch (e) {
    console.log('Error:', e);
  }
}

export const fetchMeAuth = (user:TypeAuthMaterial):TypeThunkAction => (dispatch:DispatchType) => {
  try {
    authAPI.login(user).then(({data}:AxiosResponse<TypeAuthUser[]>) => {
      dispatch(actions.setAuth(data))
    })
  } catch (e) {
    console.log('Error:', e);
  }
}

export const fetchLogout = (id:number):TypeThunkAction => (dispatch:DispatchType) => {
  try {
    authAPI.logout(id).then(() => {
      dispatch(actions.setLogout())
    })
  } catch (e) {
    console.log('Error:', e)
  }
}

export const fetchRegister = (user:TypeAuthMaterial):TypeThunkAction => (dispatch:DispatchType) => {
  try {
    authAPI.register(user).then(({data}:AxiosResponse<TypeAuthMaterial>) => {
      console.log(data)
      dispatch(actions.setRegister(data))
    })
  } catch (e) {
    console.log('Error:', e);
  }
}