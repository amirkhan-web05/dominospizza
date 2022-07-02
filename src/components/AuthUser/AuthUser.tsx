import React, { useState } from 'react'
import { useAppDispatch } from '../../hooks';
import { fetchMeAuth } from '../../redux/actions/action-auth';
import { TypePopup, TypeFormAuth } from '../../types'

import styles from './AuthUser.module.scss'
import { useLocation } from 'react-router-dom';
import { HOME_PAGE, REGISTER_ROUTE } from '../../routes';
import { NavLink } from 'react-router-dom';
import { RegisterUser } from '../RegisterUser/RegisterUser';

export const AuthUser:React.FC<TypePopup> = ({popup, setPopup}) => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const isAuth = location.pathname === HOME_PAGE   
  const [form, setForm] = useState<TypeFormAuth>({
    email:'',
    password:'',
  })

  const [formDirty, setFormDirty] = useState({
    emailDirty:false,
    passwordDirty:false,
  })

  const [formError, setFormError] = useState({
    email:'E-mail не может быть пустым',
    password:'Пароль не может быть пустым'
  });

  const blurHandler = (e:any) => {
    switch(e.target.name) {
      case 'email':
        setFormDirty({...formDirty, emailDirty:true})
        break;
      case 'password':
        setFormDirty({...formDirty, passwordDirty:true})
        break;
    }
  }

  const validateEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setForm({...form, email:e.target.value})
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  
    if (!re.test(String(e.target.value).toLowerCase())) {
      setFormError({...formError, email:'Неккоректный E-mail'})
    } else {
      setFormError({...formError, email:''})
    }
  };

  const validatePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setForm({...form, password:e.target.value})
    
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setFormError({...formError, password:'Пароль должен быть длинее 3 и меньше 8'})
      if (!e.target.value) {
        setFormError({...formError, password:'Пароль не может быть пустым'})
      }
    } else {
      setFormError({...formError, password:''})
    }
  };

  const onSubmitAuth = (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchMeAuth(form))
    setPopup(false)
  }

  return (
    <>
      {popup && <div className={styles.popup}>
        <div className={styles.popup__inner}>
          <div className='d-flex align-items-center justify-content-between'>
            <h3 className={styles.popup__title}>{isAuth ? 'Вход' : 'Регистрация'}</h3>
            <button onClick={() => setPopup(false)} className={styles.popup__close}></button>
          </div>
          {isAuth ? <form onSubmit={onSubmitAuth} className={styles.popup__form}>
            <div className={styles.popup__reg}>
              <input value={form.email} onBlur={e => blurHandler(e)} onChange={validateEmail} name='email' className={styles.popup__input} type="text" placeholder='E-mail' />
            </div>
            <div>
              {formDirty.emailDirty && formError.email && <span className={styles['popup__email']}>{formError.email}</span>}
            </div>
            <div className={styles.popup__reg}>
              <input value={form.password} onBlur={e => blurHandler(e)} onChange={validatePassword} name='password' className={styles.popup__input} type="password" placeholder='Пароль' />
            </div>
            <div>
              {formDirty.passwordDirty && formError.password && <span className={styles['popup__password']}>{formError.password}</span>}
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
            <RegisterUser/>
          )}
        </div>
      </div>}
    </>
  )
}
