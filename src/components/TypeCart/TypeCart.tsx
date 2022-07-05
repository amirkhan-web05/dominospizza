import React from 'react'
import styles from './TypeCart.module.scss'

import checkBox from '../../assets/images/other/free-icon-checkbox-7079911.png'

export const TypeCart:React.FC<any> = ({id, setPlusCheck, plusCheck, plusCheckItem, snacks, setPlus}) => {
  return (
    <div className='d-flex align-items-center'>
      <>
         {plusCheck ? (
          <div style={{cursor:'pointer'}} onClick={() => setPlusCheck!(id)}>
            <img width={24} src={checkBox} alt="" />
          </div>
        ) : (
          <div>
            <button onClick={() => setPlusCheck(id)} className={styles.cart__btn}>+</button>
          </div>
        )
      }
      <p className={styles.cart__extra}>Сыр x2</p>
      </>
    </div>
  )
}
