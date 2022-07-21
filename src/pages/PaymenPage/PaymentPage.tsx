import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchOrders } from '../../redux/actions/orders/action-orders'
import { selectCartData } from '../../redux/selectors/selectors'
import { useTotal } from '../../utils/useTotal'
import styles from './PaymentPage.module.scss'
import { PaymentValidate } from './paymentValidate/PaymentValidate'

export const PaymentPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const {cart} = useAppSelector(selectCartData)
    const {totalCount} = useTotal(cart)
    const {
        payment, 
        validateEmail,
        validateName,
        validateHome,
        validateApartment,
        validatePhone,
        validateStreet,
        validateDriveway,
        validateStory,
        validateIntercomCode,
        formValid, 
        formDirty, 
        formError, 
        blurHandler
    } = PaymentValidate()


    const handlerSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(fetchOrders(payment))
    }

    return (
        <div>
            <form onSubmit={handlerSubmit} className="container">
                <div className={styles.payment__inner}>
                    <div className={styles.payment__contact}>
                        <h5 className={styles['payment__contact-text']}>Контакты</h5>
                            <div>
                                <div className='d-flex align-items-center mt-3'>
                                    <button className={styles.payment__btn}>Войти</button>
                                    <span className={styles.payment__other}>или заполнить форму ниже</span>
                                </div>
                                <div className='w-100 mt-3 d-flex justify-content-between'>
                                    <div style={{width:"100%", maxWidth:300}}>
                                        <input value={payment.name} onBlur={e => blurHandler(e)} name='name' onChange={validateName} placeholder='Имя' className={styles.payment__input} type="text" />
                                        {formError.name && formDirty.nameDirty && <span>{formError.name}</span>}
                                    </div>
                                    <div style={{width:"100%", maxWidth:300}}>
                                        <input value={payment.phone} onBlur={e => blurHandler(e)} name='phone' onChange={validatePhone} placeholder='Телефон' className={styles.payment__input} type="number" />
                                        {formError.phone && formDirty.phoneDirty && <span>{formError.phone}</span>}
                                    </div>
                                    <div style={{width:"100%", maxWidth:300}}>
                                        <input value={payment.email} onBlur={e => blurHandler(e)} name='email' onChange={validateEmail} placeholder='E-mail' className={styles.payment__input} type="text" />
                                        {formError.email && formDirty.emailDirty && <span>{formError.email}</span>}
                                    </div>
                            </div>
                        </div>                               
                    </div>
                </div>
                <div className={styles.address}>
                    <div className={styles.address__container}>
                        <h5 className={styles['payment__contact-text']}>Адрес</h5>
                        <div className={styles.address__content}>
                            <h4>Введите адрес или выберите дом</h4>
                            <div className="address__data">
                                <div style={{width:"100%"}}>
                                    <input value={payment.street} onBlur={e => blurHandler(e)} name='street' onChange={validateStreet} className={styles['payment__input-street']} placeholder='Улица' type="text" />
                                    {formError.street && formDirty.streetDirty && <span className={styles['payment__content-error']}>{formError.street}</span>}
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div style={{width:"100%", maxWidth:200}}>
                                        <input value={payment.home} onBlur={e => blurHandler(e)} name='home' onChange={validateHome} className={styles.payment__input} placeholder='Дом' type="text" />
                                        {formError.home && formDirty.homeDirty && <span className={styles['payment__content-error']}>{formError.home}</span>}
                                    </div>
                                    <div style={{width:"100%", maxWidth:200}}>
                                        <input value={payment.apartment} onBlur={e => blurHandler(e)} name='apartment' onChange={validateApartment} className={styles.payment__input} placeholder='Квартира' type="text" />
                                        {formError.apartment && formDirty.apartmentDirty && <span className={styles['payment__content-error']}>{formError.apartment}</span>}
                                    </div>
                                    <div style={{width:"100%", maxWidth:200}}>
                                        <input value={payment.story} onBlur={e => blurHandler(e)} name='story' onChange={validateStory} className={styles.payment__input} placeholder='Этаж' type="text" />
                                        {formError.story && formDirty.storyDirty && <span className={styles['payment__content-error']}>{formError.story}</span>}
                                    </div>
                                    <div style={{width:"100%", maxWidth:200}}>
                                        <input value={payment.driveway} onBlur={e => blurHandler(e)} name='driveway' onChange={validateDriveway} className={styles.payment__input} placeholder='Подъезд' type="text" />
                                        {formError.driveway && formDirty.drivewayDirty && <span className={styles['payment__content-error']}>{formError.driveway}</span>}
                                    </div>
                                    <div style={{width:"100%", maxWidth:200}}>
                                        <input value={payment.intercomCode} onBlur={e => blurHandler(e)} name='intercomCode' onChange={validateIntercomCode} className={styles.payment__input} placeholder='Код домофона' type="text" />
                                        {formError.intercomCode && formDirty.intercomCodeDirty && <span className={styles['payment__content-error']}>{formError.intercomCode}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-between'>
                    <button disabled={!formValid} type='submit' className={styles.payment__checkout}>Заказать</button>
                    <h3>Итого: {totalCount} ₽</h3>
                </div>
            </form>
        </div>
    )
}
