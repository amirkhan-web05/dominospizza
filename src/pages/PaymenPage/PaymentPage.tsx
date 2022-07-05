import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import React, { useState } from 'react'
import styles from './PaymentPage.module.scss'

const stripPromise = loadStripe('pk_test_51JTrV6HFoKUaoW0tHv5bNwAi1U2OuNYEbN7gpFdSMvIWx9ElHOtsx7EcslJOZrhDNkxHzuqL8FX16WrQ4QL3OjGy00ei4b2lLa')

export const PaymentPage: React.FC<any> = ({checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout}) => {
    const [order, setOrder] = useState({});
    
    const handleSubmit = async (event:any, elements:any, stripe:any) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement)

        const {error, paymentMethod} = await stripe.createPaymentMethod({type:'card', card:cardElement})

        if (error) {
            console.log(error)
        } else {
            const orderData = {
                line_items:checkoutToken.live.line_items,
                customer:{firstName:shippingData.fristName, lastname:shippingData.lastName, email:shippingData.email},
                shopping: {
                    name:'Primary', 
                    street:shippingData.addres1, 
                    town_city:shippingData.city,
                    county:shippingData.shippingSubvision, 
                    postal_zip_code:shippingData.zip, 
                    country:shippingData.shippingCountry
                },
                fulfillment:{shipping_methid:shippingData.shippingOption},
                paymnet: {
                    gateway:'stripe',
                    stripe: {
                        payment_method_id:paymentMethod.id
                    }
                }
            }

            onCaptureCheckout(checkoutToken.id, orderData);

            nextStep();
        }
    }
    
    return (
        <div>
            <div className="container">
                <div className={styles.payment__inner}>
                    <div className={styles.payment__contact}>
                        <h5 className={styles['payment__contact-text']}>Контакты</h5>
                        <Elements stripe={stripPromise}>
                            <ElementsConsumer>{({elements, stripe}) => (
                                <form onSubmit={e => handleSubmit(e, elements, stripe)}>
                                    <div className='d-flex align-items-center mt-3'>
                                        <button className={styles.payment__btn}>Войти</button>
                                        <span className={styles.payment__other}>или заполнить форму ниже</span>
                                    </div>
                                    <div className='w-100 mt-3 d-flex justify-content-between'>
                                        <div>
                                            <input placeholder='Имя' className={styles.payment__input} type="text" />
                                        </div>
                                        <div>
                                            <input placeholder='Телефон' className={styles.payment__input} type="text" />
                                        </div>
                                        <div>
                                            <input placeholder='E-mail' className={styles.payment__input} type="text" />
                                        </div>
                                    </div>
                                    </form>
                                )}
                            </ElementsConsumer>
                        </Elements>
                    </div>
                </div>
                <div className={styles.address}>
                    <div className={styles.address__container}>
                        <h5 className={styles['payment__contact-text']}>Адрес</h5>
                        <div className={styles.address__content}>
                            <h4>Введите адрес или выберите дом</h4>
                            <div className="address__data">
                                <div>
                                    <input className={styles.payment__input} placeholder='Улица' type="text" />
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <input className={styles.payment__input} placeholder='Дом' type="text" />
                                    </div>
                                    <div>
                                        <input className={styles.payment__input} placeholder='Квартира' type="text" />
                                    </div>
                                    <div>
                                        <input className={styles.payment__input} placeholder='Подъезд' type="text" />
                                    </div>
                                    <div>
                                        <input className={styles.payment__input} placeholder='Этаж' type="text" />
                                    </div>
                                    <div>
                                        <input className={styles.payment__input} placeholder='Код домофона' type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
