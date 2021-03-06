import React, { useEffect, useRef, useState } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper";

import styles from './Header.module.scss'

import locationImg from '../../assets/images/other/icons8-location-50.png'
import arrowImg from '../../assets/images/other/icons8-down-24.png'
import basketImg from '../../assets/images/shopping-basket.png'
import { Outlet } from 'react-router-dom';
import { Cart } from '../Cart/Cart';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchGetCart } from '../../redux/actions/cart/action-cart';
import { TypeTicketItems } from '../../types';
import { AuthUser } from '../AuthUser/AuthUser';
import { CitiesModalList } from '../CitiesModalList/CitiesModalList';
import { fetchCities } from '../../redux/actions/items/action-items';
import { CSSTransition } from 'react-transition-group';
import { NavBar } from '../NavBar/NavBar';
import { AxiosResponse } from 'axios';
import { apiTicket } from '../../api/ticket-api';
import { selectAuthData, selectCartData, selectCityData } from '../../redux/selectors/selectors';
import { actions } from '../../redux/actions/creators/action-creators';

const sliderImages = [
  {
    id: 1,
    images: 'https://dpru.azureedge.net/static.dominospizza.ru/api/medium/Banner/Web/531/NULL/NULL/RU'
  },
  {
    id: 2,
    images: 'https://dpru.azureedge.net/static.dominospizza.ru/api/medium/Banner/Web/533/NULL/NULL/RU'
  },
  {
    id: 3,
    images: 'https://dpru.azureedge.net/static.dominospizza.ru/api/medium/Banner/Web/532/NULL/NULL/RU'
  }
]

export const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const headerRef = useRef<HTMLDivElement>(null)
  const cartRef = useRef<null | HTMLDivElement>(null)

  const {cart} = useAppSelector(selectCartData)
  const {auth} = useAppSelector(selectAuthData)
  
  const {cities} = useAppSelector(selectCityData)
  const [ticket, setTicket] = useState<TypeTicketItems[]>([])
  const [valueTicket, setValueTicket] = useState('')

  const useTicket = (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    apiTicket.getTicket(valueTicket).then(({data}:AxiosResponse<TypeTicketItems[]>) => {
      if (data[0].title.length === valueTicket.length) {
        setTicket(data)
      }
    })
  }

  useEffect(() => {
    apiTicket.getTicket(valueTicket).then(({data}) => {
      if (valueTicket.length) {
        setTicket(data)
      }
    })
  }, [])

  const refundTicket = () => {
    setTicket([])
  }

  const [modal, setModal] = useState(false)
  const [popup, setPopup] = useState(false)

  const [popupCities, setPopupCities] = useState(false)

  const [showCity, setShowCity] = useState<boolean | string>(false)
  const [closePopup, setClosePopup] = useState(false)

  const [value, setValue] = useState<string>('')

  const logout = () => {
    localStorage.removeItem('accessToken')
    dispatch(actions.setLogoutIn(null))
  }

  const handlerChangeModal = (): void => {
    setModal(!modal)
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      headerRef.current?.classList.toggle(styles.sticky, window.scrollY > 0)
    })    
  }, [headerRef])

  useEffect(() => {
    dispatch(fetchGetCart())
  }, [])

  useEffect(() => {
    dispatch(fetchCities(value))
  }, [value])

  useEffect(() => {
    document.body.addEventListener('click', (event:any) => {
      if (!event.path.includes(cartRef.current)){
        setModal(false)
      }
    })
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <div className="container">
          <div className="header__inner d-flex align-items-center justify-content-between">
            <div className="d-flex header__row">
              <div className={styles.header__list}>
                <span onClick={() => setClosePopup(true)} className={styles.header__item}>
                  <img className={styles.header__location} width={28} src={locationImg} alt="" /> ???????????? <img className={styles.arrow__image} width={10} src={arrowImg} alt="" />
                </span>
                {closePopup && <CitiesModalList 
                  value={value}
                  setValue={setValue}
                  showCity={showCity}
                  setShowCity={setShowCity}
                  cities={cities}
                  setClosePopup={setClosePopup}
                  popupCities={popupCities} 
                  setPopupCities={setPopupCities} 
                />}
              </div>
              <div className={styles.header__list}>
                <span style={{marginRight:5}} className={styles.header__item}>????????????????</span>
                <img className={styles.arrow__image} width={10} src={arrowImg} alt="" />
              </div>
              <div className={styles.header__list}>
                <span className={styles.header__item}>?????????? ??????????????????</span>
              </div>
              <div className={styles.header__list}>
                <span className={styles.header__item}>?????????????? ?????????? ????????????????* <strong>00:23:59</strong></span>
              </div>
            </div>
            {auth ? (
              <span onClick={logout} className={styles.header__item}>
                ??????????
              </span>
            ) : (
              <span onClick={() => setPopup(true)} className={styles.header__item}>
                ??????????
              </span>
            )}
            <CSSTransition in={popup} timeout={2000} classNames={styles['my-node']}>
              <AuthUser popup={popup} setPopup={setPopup}/>
            </CSSTransition>
          </div>
        </div>
      </div>
      <div className={styles.header__bottom}>
        <div className="container">
          <div ref={headerRef} className={`${styles['header__bottom-inner']} ${styles.sticky}`}>
            <div className="container">
              <div className="d-flex align-items-center justify-content-between">
                <NavBar/>
                <div ref={cartRef} className={styles.header__block}>
                  <form onSubmit={useTicket} className={styles.header__search}>
                    <input value={valueTicket} onChange={e => setValueTicket(e.target.value)} placeholder='????????????????' className={styles.header__input} type="text" />
                    <button type='submit' className={styles.header__button}>
                      <img width={20} src={arrowImg} alt="" />
                    </button>
                  </form>
                  <div className={styles.header__cart}>
                    <span className={styles.header__count}>{cart.length}</span>
                    <div onClick={handlerChangeModal} className={styles.header__basket}>
                      <img className={styles['header__basket-item']} width={30} src={basketImg} alt="" />
                    </div>
                  </div>
                  <Cart 
                    cart={cart} 
                    ticket={ticket}
                    onClickTicketItems={refundTicket}
                    modal={modal} 
                    setModal={setModal} 
                  />
                </div>
              </div>
            </div>
          </div>
          
          <Swiper
            className='mt-5'
            navigation={true}
            autoplay={{delay:3000, disableOnInteraction:false}}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation, Pagination, Autoplay]
            }>
            {sliderImages.map(slider => (
              <SwiperSlide key={slider.id}>
                <img className='mt-3' src={slider.images} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Outlet />
    </header>
  )
}
