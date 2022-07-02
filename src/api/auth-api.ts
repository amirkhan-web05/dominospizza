import { TypeAuthMaterial, TypeAuthUser, TypeFormAuth, TypeRegisterForm } from './../types/index';
import { instance } from './api';

type MeResponseType = TypeAuthUser[] 
type RegisterResponseType = TypeAuthMaterial

export const authAPI = {
  me() {
    return instance.get<MeResponseType>('/users')
  },
  login(data:TypeFormAuth) {
    return instance.post<MeResponseType>('/login', data)
  },
  logout(id:number) {
    return instance.delete<number>(`/users/${id}`)
  },
  register(data:TypeRegisterForm) {
    return instance.post<RegisterResponseType>(`/users`, data)
  }
}
