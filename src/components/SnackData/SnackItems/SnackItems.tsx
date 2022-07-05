import React from 'react'
import { TypeSnackItems } from '../../../types'

import styles from './SnackItems.module.scss'

export const SnackItems:React.FC<TypeSnackItems> = ({id, name, typePrices, images, onClickAdd, count, price, description}) => {
  return (
    <div className={styles.snacks__items}>
        <img height={224} src={images} alt="" />
        <div className={styles.snacks__info}>
            <h3 className={styles['snacks__info-name']}>{name}</h3>
            <p className={styles['snacks__info-text']}>{description}</p>
            <button onClick={() => onClickAdd!({id, name, images, price, typePrices:typePrices[0], description, count})} className={styles['snacks__info-price']}>{price} ₽</button>
        </div>
    </div>
  )
}
