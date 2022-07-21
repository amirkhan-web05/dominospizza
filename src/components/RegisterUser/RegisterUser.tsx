import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'

import { HOME_PAGE, REGISTER_ROUTE } from '../../routes';
import { fetchRegister } from '../../redux/actions/auth/action-auth';

import styles from './Register.module.scss';
import { NavLink } from 'react-router-dom';
import { ValidateForm } from './validateForm/ValidateForm';


export const RegisterUser:React.FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const isAuth = location.pathname === HOME_PAGE 
  const {form, blurHandler, validateEmail, validateUserName, formValid, validatePassword, formDirty, formError} = ValidateForm()
    

  const onSubmitRegister = (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(fetchRegister(form))
    navigate(HOME_PAGE)
  }

  return (
    <form onSubmit={onSubmitRegister} className={styles.popup__form}>
      <div className={styles.popup__reg}>
        <input onBlur={e => blurHandler(e)} value={form.username} onChange={validateUserName} name='username' className={styles.popup__input} type="text" placeholder='Введите имя' />
      </div>
      <div>
      {formDirty.usernameDirty && formError.username && <span className={styles['popup__email']}>{formError.username}</span>}
      </div>
      <div className={styles.popup__reg}>
        <input onChange={e => validateEmail(e)} onBlur={e => blurHandler(e)} value={form.email} name='email' className={styles.popup__input} type="text" placeholder='E-mail' />
      </div>
      <div>
        {formDirty.emailDirty && formError.email && <span className={styles['popup__email']}>{formError.email}</span>}
      </div>
      <div className={styles.popup__reg}>
        <input onChange={validatePassword} onBlur={e => blurHandler(e)} value={form.password} name='password' className={styles.popup__input} type="password" placeholder='Пароль' />
      </div>
      <div>
        {formDirty.passwordDirty && formError.password && <span className={styles['popup__password']}>{formError.password}</span>}
      </div>
      <div className='d-flex justify-content-center'>
        <button disabled={!formValid} type='submit' className={styles.popup__btn}>
          {isAuth ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </div>
      <NavLink to={`${isAuth ? REGISTER_ROUTE : HOME_PAGE}`}>
        {isAuth ? 'Нет аккаунта? Зарегистрируйся' : 'Есть аккаунт? Войдите'}
      </NavLink>
    </form>
  )
}
