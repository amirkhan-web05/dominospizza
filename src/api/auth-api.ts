import { TypeAuthMaterial, TypeAuthUser } from './../types/index';
import { instance } from './api';

type MeResponseType = TypeAuthUser[] 
type RegisterResponseType = TypeAuthMaterial

export const authAPI = {
  me() {
    return instance.get<MeResponseType>('/users')
  },
  login(data:TypeAuthMaterial) {
    return instance.post<MeResponseType>('/login', data)
  },
  logout(id:number) {
    return instance.delete<number>(`/users/${id}`)
  },
  register(data:TypeAuthMaterial) {
    return instance.post<RegisterResponseType>(`/users`, data)
  }
}
