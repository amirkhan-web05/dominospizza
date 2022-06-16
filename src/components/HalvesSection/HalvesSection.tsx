import React, { useState } from 'react'

import halveLeft from '../../assets/images/left-default-halve.jpg';
import halveRight from '../../assets/images/right-default-halve.jpg';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { actions } from '../../redux/actions/action-creators';
import { fetchHalves } from '../../redux/actions/action-items';
import { HalvesList } from './HalvesList/HalvesList';

import styles from './HalvesSection.module.scss'

const btnTypeSize = ['28 см', '33 см'];
const btnTypeCategories = ['Тонкое', 'Классическое']

export const HalvesSection:React.FC = () => {
  const dispatch = useAppDispatch()

  const [activeSize, setActiveSize] = useState(0)
  const [activeCategories, setActiveCategories] = useState(0)
  const [activeHalves, setActiveHalves] = useState(false)
  
  const halves = useAppSelector(state => state.halves.halves)

  const onHandlerHalves = (id:number) => {
    dispatch(actions.setHalvesItems(id)) 
  }

  React.useEffect(() => {
    dispatch(fetchHalves())
  }, [])

  return (
    <div className='container'>
      <h2 className='text-center mt-5'>Выберите половинки</h2>
      <div className={styles.halves}>
        <div className={styles.halves__inner}>
          <div className={styles.halves__images}>
            {halves.map((item, index) => (
              item.isHalves ? (
                <>
                  <div className={styles['halves__left']}>
                    <img width={220} height={220} src={item.images} alt=''/>
                  </div>
                  <div className={styles['halves__right']}>
                    <img width={220} height={220} src={halveRight} alt=''/>
                  </div>
                </>
              ) : (
                null
              )
            ))}
          </div>
          <div className={styles.halves__content}>
            <div className={styles.halves__preview}>
              <div className={styles.halves__block}>
                <span>Выбери левую сторону</span>
                <div className={styles['halves__images-min']}>
                  <div className={styles['halves__left']}>
                     <img src={halveLeft} alt=''/>
                  </div>
                  <div className={styles['halves__right']}>
                    <img src={halveRight} alt="" />
                  </div>
                </div>
              </div>
              <div className={styles.halves__block}>
                <span>Выбери правую сторону</span>
                <div className={styles['halves__images-min']}>
                  <div className={styles['halves__left']}>
                    <img src={halveLeft} alt="" />
                  </div>
                  <div className={styles['halves__right']}>
                    <img src={halveRight} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.halves__type}>
              {btnTypeSize.map((size, index) => (
                <button className={activeSize === index ? styles['halves__type-active'] : styles['halves__type-item']} key={`${size}_${index}`}>{size}</button>
              ))}
            </div>
            <div className={styles.halves__type}>
              {btnTypeCategories.map((categories, index) => (
                <button className={activeCategories === index ? styles['halves__type-active'] : styles['halves__type-item']} key={`${categories}_${index}`}>{categories}</button>
              ))}
            </div>
            <button className={styles['halves__type-buy']}>В корзину</button>
          </div>
        </div>
        {/* <div className={styles.halves__line}>
          <hr />
        </div> */}
        <div className={styles['items-list']}>
          <HalvesList activeHalves={activeHalves} setActiveHalves={onHandlerHalves} halves={halves}/>
        </div>
      </div>
    </div>
  )
}
