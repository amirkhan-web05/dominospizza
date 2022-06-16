import React, { useState } from 'react'
import { TypeCartItems, TypeCartItemsList, TypeSortItems } from '../../types'
import { CartItems } from '../CartItems/CartItems'
import { FiltersItems } from '../FiltersItems/FiltersItems'
import { TakeItems } from '../TakeItems/TakeItems'

import pizzasHalves from '../../assets/images/pizzas/pizza-halves-desktop.jpg'

import styles from './CartList.module.scss'
import { Link } from 'react-router-dom'
import { AUTH_PAGE } from '../../routes'
import { useAppSelector } from '../../hooks'
import { AuthUser } from '../AuthUser/AuthUser'

export const sortByItems: TypeSortItems[] = [
  { type: 'price', name: 'По цене', order: 'asc' },
  { type: 'hit', name: 'По популярности', order: 'asc' }
]

const categoryBtn = [
  { id: 1, category: 'Вегетерианская', completed: false },
  { id: 2, category: 'Острая', completed: false },
  { id: 3, category: 'С грибами', completed: false },
  { id: 4, category: 'Без лука', completed: false },
  { id: 5, category: 'Мясная', completed: false }
]

export const CartList: React.FC<TypeCartItemsList> = ({ pizzas, onAdd, setPlusChecked, activeSortType, onClickSortBy, onClickCategory, activeCategory }) => {
  const auth = useAppSelector(state => state.auth.auth)
  const [popup, setPopup] = useState(false)

  return (
    <div className='container'>
      <div className="mt-3 mb-3 d-flex align-items-center">
        <TakeItems />
        <TakeItems />
        <TakeItems />
        <TakeItems />
      </div>
      <div className='mb-3'>
        <FiltersItems
          activeCategory={activeCategory}
          onClickCategory={onClickCategory}
          categoryBtn={categoryBtn}
          activeSortType={activeSortType}
          onClickSortBy={onClickSortBy}
          items={sortByItems}
        />
      </div>
      <div className='mb-5 d-flex align-items-center flex-wrap'>
        <div style={{ width: '18rem', marginRight: '20px', marginTop: '-30px' }}>
          <img src={pizzasHalves} className="card-img-top" alt="..." />
          <div className={styles['card-body']}>
            <h5 className={styles['card-title']}>Пицца-половинки</h5>
            <p className={styles['card-text']}>Собери свою пиццу - соедини две любимые пиццы</p>
            {auth ? <Link to={`${AUTH_PAGE}`} className={styles['card__buy']}>
              <button className={styles['card__buy-btn']}>Собрать</button>
            </Link> : (
              <button onClick={() => setPopup(true)} className={styles['card__buy']}>
                Собрать
              </button>
            )}
            {
              !auth ? (
                <AuthUser popup={popup} setPopup={setPopup} />
              ) : null
            }
          </div>
        </div>
        {pizzas && pizzas.map((item: TypeCartItems) => (
          <CartItems
            key={item.id}
            {...item}
            onAdd={onAdd}
            setPlusChecked={setPlusChecked}
          />
        ))}
      </div>
    </div>
  )
}
