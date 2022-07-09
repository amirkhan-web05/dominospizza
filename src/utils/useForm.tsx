import React, { useEffect, useState } from "react";
import { TypeFormAuth } from "../types";

export const useForm = () => {
  const [formValid, setFormValid] = useState(false)
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

  useEffect(() => {
    if (formError.email || formError.password) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [formError.email, formError.password])

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


  return {
    form,
    formDirty,
    formError,
    formValid,
    validateEmail,
    blurHandler,
    validatePassword
  }
}