import React from 'react'
import styles from './TakeItems.module.scss'

export const TakeItems:React.FC = () => {
  return (
    <div className={styles.card} style={{width: '18rem'}}>
      <img src="https://dpru.azureedge.net/static.dominospizza.ru/api/medium/Coupon/Global/1PL1SR/NULL/NULL/RU" className="card-img-top" alt="..."/>
      <div className={styles['card-body']}>
        <h5 className="card-title">Domino's XИТ</h5>
        <p className={styles['card-text']}>В акции участвуют все средние пиццы на тонком тесте. Подарочная пицца</p>
        <a href="/" className={styles.card__btn}>Воспользоваться</a>
      </div>
    </div>
  )
}
