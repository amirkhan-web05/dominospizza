import React from 'react'
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks';
import { fetchMeAuth, fetchRegister } from '../../redux/actions/action-auth';
import { TypePopup, TypeAuthMaterial, TypeAuthUser } from '../../types'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './AuthUser.module.scss'
import { useLocation } from 'react-router-dom';
import { HOME_PAGE, REGISTER_ROUTE } from '../../routes';
import { NavLink } from 'react-router-dom';

const schema = yup.object({
  email: yup.string().email().required('Поле «E-mail» обязательно для заполнения'),
  username:yup.string().required(),
  password: yup.string().required('Поле «Пароль» обязательно для заполнения').min(8).max(32),
}).required();

export const AuthUser:React.FC<TypePopup> = ({popup, setPopup}) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const isAuth = location.pathname === HOME_PAGE   
  const { register, handleSubmit, formState:{errors} } = useForm<TypeAuthMaterial & TypeAuthUser>({
    resolver:yupResolver(schema)
  });

  const onSubmitAuth = (data:TypeAuthMaterial) => {
    dispatch(fetchMeAuth(data))
  }

  const onSubmitRegister = (data:TypeAuthMaterial) => {
    dispatch(fetchRegister(data))
  }  

  return (
    <>
      {popup && <div className={styles.popup}>
        <div className={styles.popup__inner}>
          <div className='d-flex align-items-center justify-content-between'>
            <h3 className={styles.popup__title}>{isAuth ? 'Вход' : 'Регистрация'}</h3>
            <button onClick={() => setPopup(false)} className={styles.popup__close}></button>
          </div>
          {isAuth ? <form onSubmit={handleSubmit(onSubmitAuth)} className={styles.popup__form}>
            <div className={styles.popup__reg}>
              <input {...register('email')} name='email' className={errors.email?.message ? styles.popup__error : styles.popup__input} type="text" placeholder='E-mail' />
            </div>
            <div>
              <span className={styles['popup__email']}>{errors.email?.message}</span>
            </div>
            <div className={styles.popup__reg}>
              <input {...register('password')} name='password' className={errors.password?.message ? styles.popup__error : styles.popup__input} type="text" placeholder='Пароль' />
            </div>
            <div>
              <span className={styles['popup__password']}>{errors.password?.message}</span>
            </div>
            <div className='d-flex justify-content-center'>
              <button type='submit' className={styles.popup__btn}>
                {!isAuth ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </div>
            <NavLink to={`${isAuth ? REGISTER_ROUTE : HOME_PAGE}`}>
              {isAuth ? 'Нет аккаунта? Зарегистрируйся' : 'Есть аккаунт? Войдите'}
            </NavLink>
          </form> : (
            <form onSubmit={handleSubmit(onSubmitRegister)} className={styles.popup__form}>
            <div className={styles.popup__reg}>
              <input {...register('username')} name='username' className={styles.popup__input} type="text" placeholder='Введите имя' />
            </div>
            <div className={styles.popup__reg}>
              <input {...register('email')} name='email' className={errors.email?.message ? styles.popup__error : styles.popup__input} type="text" placeholder='E-mail' />
            </div>
            <div>
              <span className={styles['popup__email']}>{errors.email?.message}</span>
            </div>
            <div className={styles.popup__reg}>
              <input {...register('password')} name='password' className={errors.password?.message ? styles.popup__error : styles.popup__input} type="text" placeholder='Пароль' />
            </div>
            <div>
              <span className={styles['popup__password']}>{errors.password?.message}</span>
            </div>
            <div className='d-flex justify-content-center'>
              <button type='submit' className={styles.popup__btn}>
                {isAuth ? 'Войти' : 'Зарегистрироваться'}
              </button>
            </div>
            <NavLink to={`${isAuth ? REGISTER_ROUTE : HOME_PAGE}`}>
              {isAuth ? 'Нет аккаунта? Зарегистрируйся' : 'Есть аккаунт? Войдите'}
            </NavLink>
          </form>
          )}
        </div>
      </div>}
    </>
  )
}
