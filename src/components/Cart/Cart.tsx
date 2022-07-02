import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { fetchDeleteCart, fetchMinusCart, fetchPlusCart } from '../../redux/actions/action-cart'
import { actions } from '../../redux/actions/action-creators'
import { PAYMENT_ROUTE } from '../../routes'
import { TypeCartItems, TypeModalCart } from '../../types'
import { TypeCart } from '../TypeCart/TypeCart'
import styles from './Cart.module.scss'

export const Cart:React.FC<TypeModalCart> = ({modal, setModal, cart, ticket, onClickTicketItems}) => {
  const dispatch = useAppDispatch()
  const typePrice = 59

  const toggleCheckPlus = (id:number) => {
    dispatch(actions.setCheckedPlusCart(id))    
  }

  const totalCount = cart.reduce((acc:number, item:TypeCartItems) => {
    if(item.plusChecked) {
      return acc += item.typePrices && item.count * item.typePrices + typePrice
    } else {
      return acc += item.typePrices && item.count * item.typePrices
    }
  }, 0)

  const removeCart = (id:number) => {
    dispatch(fetchDeleteCart(id))
  }

  const plusCart = (id:number, count:number) => {
    dispatch(fetchPlusCart(id, count + 1))
  }

  const minusCart = (id:number, count:number) => {
    dispatch(fetchMinusCart(id, count - 1))
  }

  return (
    <>
      {modal &&  <div className={styles.cart}>
        {<div className={styles.cart__inner}>
          <div className={styles['cart__inner-item']}>
            <div className={styles.banner}>
              <div className={styles.banner__inner}>
                <h3>
                  Двойная порция сыра от <strong>39 ₽</strong>
                </h3>
              </div>
            </div>
          </div>
          <>
          {cart.length ? <>
            {cart.map((item) => (
              <div key={item.id} className={styles.cart__block}>
                <div className={styles.cart__content}>
                  <div className="cart__content-item d-flex justify-content-between pe-3 ps-3">
                    <div>
                      <h4 className={styles.cart__name}>{item.name}</h4>
                      <p className={styles.cart__subname}>Тонкое, {item.category}</p>
                    </div>
                    <TypeCart
                      id={item.id}
                      setPlusCheck={toggleCheckPlus}
                      plusCheck={item.plusChecked} 
                    />
                  </div>
                </div>
                <div className={styles['cart__info-border']}>
                  <div className="cart__indicator d-flex p-3 justify-content-between align-items-center">
                    <div className='d-flex align-items-center'>
                      {item.count === 1 ? <div onClick={() => removeCart(item.id)} className={styles.cart__remove}>
                        <svg width="18" height="20" fill="none" viewBox="0 0 18 20"><g><path className="trash-cap" fill="#505061" d="M1 2a1 1 0 100 2h16a1 1 0 100-2H1z" fillRule="evenodd" clipRule="evenodd"></path><path className="trash-cap-handle" fill="#505061" fillRule="evenodd" d="M7 0a1 1 0 00-1 1v1h6V1a1 1 0 00-1-1H7z" clipRule="evenodd"></path></g><path fill="#505061" d="M1.922 6a.98.98 0 00-.988 1.065v.01l1.418 11.558a1.5 1.5 0 001.494 1.365H14.12a1.5 1.5 0 001.494-1.365l1.424-11.558v-.01A.982.982 0 0016.048 6a.987.987 0 00-.997.886L13.703 17.53v.01a.5.5 0 01-.5.459h-8.44a.5.5 0 01-.499-.459v-.01L2.922 6.887A.99.99 0 001.922 6z"></path><path fill="#505061" d="M6.5 6a.986.986 0 00-.998 1.033L6 15.034v.002c.028.53.468.964 1 .964.572 0 1.025-.495.997-1.066l-.5-8v-.002A.985.985 0 006.5 6zM11.5 6c-.532 0-.97.4-.998.932v.001l-.499 7.999v.002C9.974 15.505 10.428 16 11 16c.532 0 .972-.433 1-.964v-.002l.498-7.998v-.003A.986.986 0 0011.5 6z"></path></svg>
                      </div> : (
                      <div className='d-flex align-items-center'>
                        <button onClick={() => minusCart(item.id, item.count)} className={styles['cart__meter-btn']}>-</button>
                      </div>      
                      )}
                      <div className='d-flex align-items-center'>
                        <span className={styles.cart__meter}>{item.count}</span>
                        <button onClick={() => plusCart(item.id, item.count)} className={styles['cart__meter-btn']}>+</button>
                      </div>
                    </div>
                    <h5>{item.plusChecked ? item.typePrices * item.count + typePrice : item.typePrices * item.count} ₽ </h5>
                  </div>
                </div>
              </div>
            ))}
          </> : (
            <div className='text-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="none" viewBox="0 0 192 192"><path fill="#fff" d="M26 84h140v22H26V84zM6 159h180v24H6v-24zM26 106V84l-2.933 11L6 159h7l13-53zM166 84v22l14 53h6l-17.067-64L166 84z"></path><path fill="#fff" d="M166 84l2.933 11L186 32h-6l-14 52zM23.067 95L26 84 13 32H6l17.067 63zM166 106H26l-13 53h167l-14-53z"></path><path fill="#fff" d="M26 84h140l14-52h-72c0-6.627-5.373-12-12-12s-12 5.373-12 12H13l13 52z"></path><path fill="#fff" d="M186 8H6v24h78c0-6.627 5.373-12 12-12s12 5.373 12 12h78V8z"></path><path stroke="#C0C5D0" strokeWidth="2" d="M26 84h140M26 84v22m0-22l-2.933 11M26 84L13 32m153 52v22m0-22l2.933 11M166 84l14-52m-14 74H26m140 0l14 53M26 106l-13 53M186 32V8H6v24m180 0l-17.067 63M186 32h-6M6 32l17.067 63M6 32h7M6 159v24h63.5M6 159h7m-7 0l17.067-64M186 159v24h-61.25M186 159h-6m6 0l-17.067-64M13 159h56.5m110.5 0h-55.25M180 32h-72c0-6.627-5.373-12-12-12s-12 5.373-12 12H13m56.5 127v24m0-24h55.25M69.5 183h55.25m0-24v24"></path><path fill="#F3F3F7" d="M57.5 130c-.8-.8-2 0-2.5.5-1.5 1.5 0 2 1 2.5.8.4 1.666-.5 2-1 .166-.333.3-1.2-.5-2zM69 130c-1.2.4-1.833-.5-2-1-.167-.667-.1-2 1.5-2 2 0 2 2.5.5 3zM73 136.5c.8-1.6-1-2.333-2-2.5-.58-.152-1.575.937-2 1.5-.333 0-1 .2-1 1s1.667 1.333 2.5 1.5c.5.167 1.7.1 2.5-1.5zM124.5 133c-.8-1.2.667-1.833 1.5-2 .167 0 .7.1 1.5.5 1 .5.5 2 0 2.5s-2 .5-3-1zM136.5 140.5c.4-1.2-.833-1.5-1.5-1.5-.5-.05-1 .5-1 1.5 0 .8.667 1 1 1 .333.167 1.1.2 1.5-1zM155.5 133c-1.2.4-1.833-.833-2-1.5-.167-.333-.3-1.1.5-1.5 1.6-.8 2.333.333 2.5 1 .167.5.2 1.6-1 2zM22 147c-1.2-.8 1.5-1 3-1 2 .4 1.5 1.167 1 1.5-.833.167-2.8.3-4-.5zM25 130.5c-.4.8-1.5.333-2 0-.4-.214.5-.422 1-.5.5-.167 1.4-.3 1 .5z"></path><path fill="#F3F3F7" d="M38.5 130c-.8 1.2 1.333 1.5 2.5 1.5.4-.4 1.833.167 2.5.5H46c1 0 1.5.5 3.5 2 1.6 1.2 5.667.833 7.5.5.667 0 2.1.1 2.5.5.4.4 2.833-.167 4-.5.833-.333 2.9-.6 4.5 1s4 2.333 5 2.5c.667 0 2.1-.1 2.5-.5.5-.5 2 0 4 0s1.5 1 .5 1c-.8 0-1.667.333-2 .5-.167 0-.5.2-.5 1s1 1 1.5 1c.833 0 2.5-.1 2.5-.5s1-.5 1.5-.5h4.5c1 0 .5 1.5 0 1.5-.4 0-1.167.333-1.5.5-.167 0-.5.1-.5.5s-1 .5-1.5.5h-4c-.8 0-2 .333-2.5.5-.5.167-1.6.6-2 1-.5.5 0 1 1.5 1 1.2 0 .5 1 0 1.5l-1.5.5c-.167.167-.5.7-.5 1.5s-.667 1-1 1h-2c-1.5 0-1 .5-2 1-.8.4.667.833 1.5 1 .167.167.3.5-.5.5-1.2-.4-2.5.167-3 .5 0 .167-.2.6-1 1s-1.667 1.833-2 2.5c3.333.167 10 .4 10 0s-.333-1.167-.5-1.5c0-.5.1-1.4.5-1 .4.4 3.167.5 4.5.5.167-.167.7-.6 1.5-1 1-.5 0-1.5-.5-1.5-.4 0-.833-.667-1-1 .167-.333.7-.8 1.5 0 1 1 3.5 0 6 0 2 0 3.833-.667 4.5-1 0-.167.2-.6 1-1 1-.5.5-1 0-1.5-.4-.4-1.167-.833-1.5-1-.167 0-.5-.1-.5-.5s1.667-.5 2.5-.5c.667 0 2.1.2 2.5 1 .5 1 3.5 1 4.5 1s1 0 1 1 1.5 1 2.5 1c.8 0 .333.667 0 1-.167 0-.6.1-1 .5s.167.5.5.5c.667.167 2 .6 2 1 0 .5 1.5 1 2 1.5s2.5.5 4 .5 0 .5-1 .5c-.8 0 0 .667.5 1h11c.8 0 .333-.667 0-1-.5 0-1.7-.1-2.5-.5s-.667-.833-.5-1c.333 0 1-.2 1-1 0-1.6-2.667-2-4-2-1 0-3.1-.2-3.5-1-.4-.8-1.5-1.333-2-1.5-.167-.167-.6-.7-1-1.5s1.167-1 2-1c.333 0 1-.1 1-.5s-1-.833-1.5-1c-.333-.333-1.3-1-2.5-1s-1.833-.333-2-.5c-.5-.5-1.7-1.5-2.5-1.5-1 0-1 0-1-.5 0-.4 1.667-.167 2.5 0 .5.5 1.6 1.3 2 .5.4-.8 1.167-.667 1.5-.5 1 .5 3.3 1.5 4.5 1.5 1.5 0 1-1 3-1 1.6 0 3 1.333 3.5 2 .667.5 2.8 1.5 6 1.5s4.333-.333 4.5-.5c.167-.167.7-.5 1.5-.5s1.333 1 1.5 1.5c.333.5 1.1 1.3 1.5.5.4-.8.833-1 1-1 .333 0 1.1.1 1.5.5.5.5 2.5.5 3.5.5s1-.5 1.5-.5c.4 0 .833.333 1 .5 1 .167 3.1.4 3.5 0 .5-.5.5 0 1-.5.4-.4.833.5 1 1 .5 0 1.5-.1 1.5-.5s-.333-.5-.5-.5c-.5 0-1.5-.1-1.5-.5 0-1.2-1-1.5-1.5-1.5-1 .167-3.4.3-5-.5s-4-.333-5 0c-.167.167-.7.4-1.5 0-1.2-1.6-4.5-2.333-6-2.5h-6.5c-1.6-1.6-2.667-1.333-3-1-.333.167-1.3.3-2.5-.5s-3.167-1-4-1h-5c-1.2 0-1.167-.333-1-.5l2-.5c1.667-.333 5.2-.8 6 0 1 1 3 .5 5 .5 1.6 0 2-.667 2-1 .667 0 2.2-.2 3-1 1.6-2 3-1.5 3.5-1 .333.5 1.4 1.5 3 1.5 2 0 2-.5 4-2 1.6-1.2 3.667-.833 4.5-.5 2.333.333 7.1.8 7.5 0 .4-.8 1.5-1.333 2-1.5 1-.167 3.1-.7 3.5-1.5.4-.8 1.833-1 2.5-1l3-.5c.333 0 1-.1 1-.5 0-.5-6.5.5-8.5.5-1.6 0-3.333.667-4 1h-5.5c-2 0-3.5-.333-4-.5-2.167-.333-7-.6-9 1s-3.5 1.667-4 1.5c-.5.333-2.2 1-5 1s-4.167.667-4.5 1h-4.5c-.667 0-2.4.1-4 .5s-2.333-.5-2.5-1c-.333-.667-.4-2 2-2s3.333-1.667 3.5-2.5c-.167-.5-.4-1.5 0-1.5 1.2 0 1.5-1 1.5-1.5l8-1c.333 0 1-.2 1-1 0-1-.5-.5-1-1-.4-.4.167-.833.5-1h2.5c.167 0 .5-.1.5-.5s-.333-.5-.5-.5h-2.5c-.8 0-.333-.333 0-.5.333 0 .8-.1 0-.5s0-.5.5-.5h3.5c.333 0 1-.1 1-.5s-1-.5-1.5-.5h-13.5c-2.4 0-1 1 0 1.5.667.167 2.3.7 3.5 1.5 1.5 1-.5 1.5-2.5 1.5-1.6 0-2.333 1.333-2.5 2-.167.5-.8 1.5-2 1.5-4 0-4 0-4.5.5-.4.4.167.833.5 1 0 .333-.4.9-2 .5s-1.667 1.167-1.5 2v3c0 1-2.5 0-3-.5-.4-.4-2.5-.833-3.5-1-1.5 0-4.7-.1-5.5-.5-.8-.4 0-.833.5-1 1-.167 2.9-.9 2.5-2.5-.4-1.6-2.167-2-3-2-.833 0-2.5-.2-2.5-1s-.667-1.333-1-1.5c-1-.333-3.3-.9-4.5-.5-1.2.4-2.167-.167-2.5-.5-.833-.333-2.1-1-.5-1s1.333-.667 1-1c-.333-.167-1.2-.5-2-.5-1 0-.5-.5-1-1s-5-.5-6.5-.5-1 1-.5 1.5 1.5.5 2 1 0 .5 0 1.5 2.5 1 4 1 1.5.5 1 1 0 1 .5 1c.4 0 .5.667.5 1-.5-.167-1.5-.1-1.5 1.5s4 2.667 6 3c-.167.333-.1 1.1 1.5 1.5 1.6.4 2.333.833 2.5 1l-.5.5-2 .5c-.5 0-1.7-.1-2.5-.5-1-.5-2.5 0-4.5-.5-2-2-4.833-2.167-6-2-1-.167-3.7-.4-6.5 0s-5.167-.167-6-.5c-.334-.333-1.3-1-2.5-1s-1.833.667-2 1H47c-2.4 0-3-.333-3-.5-1.5-.5-4.7-1.2-5.5 0z"></path><path fill="#F3F3F7" d="M42 133c-.8 0-1.333-.333-1.5-.5-.353-.24.5-.5 1.5-.5.8 0 1 .333 1 .5 0 .167-.2.5-1 .5zM34.5 145c-.8-1.6 2.667-2 4.5-2 2.667.167 8.1.4 8.5 0 0-1.5 2.5-2 3-2s2 1.181 2.5.5c.4-.545 1.833-.227 2.5 0 .667.167 2 .4 2 0s1.333-.5 2-.5c1 .167 3.1.3 3.5-.5.5-1 2-1.5 2.5-1 .4.4 2.833.5 4 .5.667-.167 2.5-.5 4.5-.5 2.5 0 2.5 1.5 1 2.5-1.2.8-3.5.333-4.5 0-.5-.333-1.9-.8-3.5 0s-3.667.667-4.5.5c-.833-.333-2.7-.8-3.5 0-.8.8-1.667 1-2 1-.833-.333-2.8-.7-4 .5-1.2 1.2-1.833 1.167-2 1-.667-.333-2.1-.8-2.5 0-.4 1.2-4.5 1.833-6.5 2-2.167 0-6.7-.4-7.5-2z"></path></svg>
              <div>
                <p className={styles.cart__none}>Положите что-нибудь в корзину.</p>
              </div>
            </div>
          )}
            {cart.length ? <div className={styles.cart__total}>
            <div onClick={() => onClickTicketItems([])} className={styles.cart__buy}>
              <Link onClick={() => setModal(false)} style={{textDecoration:'none', color:'#fff'}} to={PAYMENT_ROUTE}>Оформить</Link>
              <h5>{ticket.length && ticket.length ? totalCount - ticket[0].count : totalCount}</h5>
            </div>
          </div> : null}
          </>
        </div>}
      </div>}
    </>
  )
}
