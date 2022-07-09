import { useEffect, useState } from "react";

export const PaymentValidate = () => {
  const [formValid, setFormValid] = useState(false)
  const [formDirty, setFormDirty] = useState({
    emailDirty:false,
    nameDirty:false,
    phoneDirty:false,
    streetDirty:false,
    apartmentDirty:false,
    drivewayDirty:false,
    homeDirty:false,
    storyDirty:false,
    intercomCodeDirty:false,
  })

  const blurHandler = (e:any) => {
    switch(e.target.name) {
      case 'email':
        setFormDirty({...formDirty, emailDirty:true})
        break;
      case 'name':
        setFormDirty({...formDirty, nameDirty:true})
        break;
      case 'phone':
        setFormDirty({...formDirty, phoneDirty:true})
        break;
      case 'street':
        setFormDirty({...formDirty, streetDirty:true})
        break;
      case 'apartment':
        setFormDirty({...formDirty, apartmentDirty:true})
        break;
      case 'driveway':
        setFormDirty({...formDirty, drivewayDirty:true})
        break;
      case 'story':
        setFormDirty({...formDirty, storyDirty:true})
        break;
      case 'intercomCode':
        setFormDirty({...formDirty, intercomCodeDirty:true})
        break;
      case 'home':
        setFormDirty({...formDirty, homeDirty:true})
        break;
    }
  }

  const [payment, setPayment] = useState({
    name:'',
    phone:'',
    email:'',
    street:'',
    home:'',
    apartment:'',
    driveway:'',
    story:'',
    intercomCode:''
  })

  const [formError, setFormError] = useState({
      name:'Имя не может быть пустым',
      phone:'Номер телефона не может быть пустым',
      email:'E-mail не может быть пустым',
      street:'Название улицы не может быть пустым',
      home:'Название дома не может быть пустым',
      apartment:'Название квартиры не может быть пустым',
      driveway:'Название подъезда не может быть пустым',
      story:'Название этажа не может быть пустым',
      intercomCode:'Код домофона не может быть пустым'
  });

  useEffect(() => {
    const isValidForm = formError.email || formError.phone || formError.apartment || formError.driveway || formError.intercomCode || formError.story || formError.street || formError.home 
    if (isValidForm) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [formError.email || formError.phone || formError.apartment || formError.driveway || formError.intercomCode || formError.story || formError.street || formError.home ])

  const validateEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setPayment({...payment, email:e.target.value})
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  
      if (!re.test(String(e.target.value).toLowerCase())) {
        setFormError({...formError, email:'Неккоректный E-mail'})
      } else {
        setFormError({...formError, email:''})
      }
  };

  const validateName = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPayment({...payment, name:e.target.value})

    if (!e.target.value.length) {
      setFormError({...formError, name:'Имя не может быть пустым'})
    } else {
      setFormError({...formError, name:''})
    }
  }

  const validatePhone = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPayment({...payment, phone:e.target.value})

    if (!e.target.value.length) {
      setFormError({...formError, phone:'Номер телефона не может быть пустым'})
    } else {
      setFormError({...formError, phone:''})
    }
  }

  const validateStreet = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPayment({...payment, street:e.target.value})

    if (!e.target.value.length) {
      setFormError({...formError, street:'Название улицы не может быть пустым'})
    } else {
      setFormError({...formError, street:''})
    }
  }

  const validateApartment = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPayment({...payment, apartment:e.target.value})

    if (!e.target.value.length) {
      setFormError({...formError, apartment:'Название квартиры не может быть пустым'})
    } else {
      setFormError({...formError, apartment:''})
    }
  }

  const validateHome = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPayment({...payment, home:e.target.value})

    if (!e.target.value.length) {
      setFormError({...formError, home:'Название дома не может быть пустым'})
    } else {
      setFormError({...formError, home:''})
    }
  }

  const validateDriveway = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPayment({...payment, driveway:e.target.value})

    if (!e.target.value.length) {
      setFormError({...formError, driveway:'Название подъезда не может быть пустым'})
    } else {
      setFormError({...formError, driveway:''})
    }
  }

  const validateStory = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPayment({...payment, story:e.target.value})

    if (!e.target.value.length) {
      setFormError({...formError, story:'Название этажа не может быть пустым'})
    } else {
      setFormError({...formError, story:''})
    }
  }

  const validateIntercomCode = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPayment({...payment, intercomCode:e.target.value})

    if (!e.target.value.length) {
      setFormError({...formError, intercomCode:'Код домофона не может быть пустым'})
    } else {
      setFormError({...formError, intercomCode:''})
    }
  }

  return {
    validateEmail,
    validateName,
    validateHome,
    validateApartment,
    validatePhone,
    validateStreet,
    validateDriveway,
    validateStory,
    validateIntercomCode,
    payment,
    setPayment,
    blurHandler,
    formDirty,
    formValid,
    formError
  }
}
