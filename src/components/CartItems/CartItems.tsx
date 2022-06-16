import React, { useState } from 'react'
import { TypeCartItems } from '../../types'
import checkBox from '../../assets/images/other/free-icon-checkbox-7079911.png'

import styles from './CartItems.module.scss'
import { useAppSelector } from '../../hooks'

const categoryBtn = ['20 см', '28 см', '33 см']

export const CartItems:React.FC<TypeCartItems> = ({id, name, price, plusChecked, setPlusChecked, typePrices, count, images, description, onAdd}) => {
  const isLoaded = useAppSelector(state => state.cart.isLoaded)
  const [activeItem, setActiveItem] = useState(0)
  const typePrice = typePrices[activeItem] + 59
  
  const onAddInCart = ():void => {
    onAdd!(
        {
          id, 
          name, 
          price, 
          count, 
          images, 
          description, 
          plusChecked, 
          categoryPrice:
          plusChecked ? typePrice : price, 
          setPlusChecked, typePrices:
          typePrices[activeItem]
        }
      )
  }

  const changeActiveHandler = (index:number) => {
    setActiveItem(index)
  }

  const [popup, setPopup] = useState<boolean>(false)

  const handlerChangePopup = ():void => {
    setPopup(!popup)
  }
  
  return (
    <div className={styles.card} style={{width: '18rem'}}>
      <img src={images} className="card-img-top" alt="..."/>
      {!popup && <div className={styles['card-body']}>
        <h5 className={styles['card-title']}>{name}</h5>
        <p className={styles['card-text']}>{description}</p>
        <div className='d-flex align-items-center justify-content-between w-100'>
          {!popup && <button onClick={handlerChangePopup} className={styles.card__btn}>Выбрать</button>}
          <span className={styles['card-price']}>От {price} ₽</span>
        </div>
      </div>}
        {popup && <div className={styles.card__menu}>
          <div className={styles['card__menu-inner']}>
            <div className={styles['card__menu-block']}>
              <h6 className={styles['card__menu-title']}>{name}</h6>
              <p className={styles['card__menu-text']}>{description}</p>
              <div className={styles['choise']}>
                <div className='d-flex align-items-center'>
                  <span className={styles['choise__ing']}>Ингредиенты</span>
                  {plusChecked && <div className={styles['choise__num']}>
                    <span>+1</span>
                  </div>}
                </div>
                <div className='d-flex align-items-center justify-content-between'>
                  { !plusChecked ? (
                    <button onClick={() => setPlusChecked!(id)} className={styles['choise__plus']}>+</button>
                  ) : (
                    <div style={{cursor:'pointer'}} onClick={() => setPlusChecked!(id)}>
                      <img width={23} src={checkBox} alt="" />
                    </div>
                  )
                  }
                  <span className={styles['choise__combo']}>Сыр x2</span>
                </div>
              </div>
              <div className={styles.category}>
                {categoryBtn.map((btn, index) => (
                  <button key={`${btn}_${index}`} onClick={() => changeActiveHandler(index)} className={activeItem === index ? styles.category__active : styles.category__btn}>{btn}</button>
                ))}
              </div>
            </div>
            {isLoaded ? (<div className={styles.card__gray}>
              <button className={styles['card__buy-btn']}>Пожалуйста подождите...</button>
            </div>) : (
            <div onClick={onAddInCart} className={styles.card__buy}>
              <button className={styles['card__buy-btn']}>В корзину</button>
              <span className={styles['card-price']}>От {plusChecked ? typePrice : price ? typePrices![activeItem] : null} ₽</span>
            </div>
            ) }
          </div>
        </div>}
    </div>
  )
}
