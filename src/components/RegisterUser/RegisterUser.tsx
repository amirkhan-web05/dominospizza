import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'

import { HOME_PAGE, REGISTER_ROUTE } from '../../routes';
import { TypeRegisterForm } from '../../types';
import { fetchRegister } from '../../redux/actions/action-auth';

import styles from './Register.module.scss';
import { NavLink } from 'react-router-dom';


export const RegisterUser:React.FC = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const isAuth = location.pathname === HOME_PAGE 

    const [form, setForm] = useState<TypeRegisterForm>({
      email:'',
      password:'',
      username:'',
    })

    const [formDirty, setFormDirty] = useState({
      emailDirty:false,
      passwordDirty:false,
      usernameDirty:false
    })

    const [formError, setFormError] = useState({
      username:'Имя не может быть пустым',
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
        case 'username':
          setFormDirty({...formDirty, usernameDirty:true})
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

    const onSubmitRegister = (e:React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
        dispatch(fetchRegister(form))
        navigate(HOME_PAGE)
    }

      return (
        <form onSubmit={onSubmitRegister} className={styles.popup__form}>
            <div className={styles.popup__reg}>
              <input onBlur={e => blurHandler(e)} value={form.username} onChange={validateEmail} name='username' className={styles.popup__input} type="text" placeholder='Введите имя' />
            </div>
            <div>
            {formDirty.usernameDirty && <span className={styles['popup__email']}>{formError.username}</span>}
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
              <button type='submit' className={styles.popup__btn}>
                {isAuth ? 'Войти' : 'Зарегистрироваться'}
              </button>
            </div>
            <NavLink to={`${isAuth ? REGISTER_ROUTE : HOME_PAGE}`}>
              {isAuth ? 'Нет аккаунта? Зарегистрируйся' : 'Есть аккаунт? Войдите'}
            </NavLink>
        </form>
    )
}
