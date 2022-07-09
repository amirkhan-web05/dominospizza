import React, { useCallback, useEffect, useRef } from 'react'
import qs from 'qs'
import { CartList } from '../components/PizzasData/CartList/CartList'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchAuth } from '../redux/actions/action-auth'
import { fetchPlusCart, fetchPostCart } from '../redux/actions/action-cart'
import { actions } from '../redux/actions/action-creators'
import { fetchPizzas } from '../redux/actions/action-items'
import { TypeCartItems, TypeCategoryBtn, TypeSortItems } from '../types'
import { useNavigate } from 'react-router-dom'

export const HomePage:React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isSearch = useRef(false)
  const isMountend = useRef(false)

  const cart = useAppSelector(state => state.cart.cart)
  const pizzas = useAppSelector(state => state.items.pizzas)
  const sortBy = useAppSelector(state => state.filters.sortBy)
  const categoryBtn = useAppSelector(state => state.filters.categoryBtn)

  const onAddHandlerCart = (obj:TypeCartItems):void => {
    const findItems = cart.find(item => item.id === obj.id) 
    console.log(findItems)

    if (findItems) {
      const {id, count} = obj
      dispatch(fetchPlusCart(id, count + 1))
    } else {
      dispatch(fetchPostCart(obj))
    }
  }

  // Если параметры в запросах не пришли, то не выводи их в URL, при первом рендере

  useEffect(() => {
    if (isMountend.current) {
      const queryString = qs.stringify({
        sortBy,
        categoryBtn
      })
  
      navigate(`?${queryString}`)
    }
    // рендер был, выводи
    isMountend.current = true;
  }, [sortBy, categoryBtn])

  // Если был первый рендер, то проверяем URL-параметры и сохраняем их redux

  useEffect(() => {
    if (window.location.search) {
      const params:any = qs.parse(window.location.search.substring(1))
      dispatch(actions.setFilters({...params}))
      
      //Если изменились параметры. Чтобы была возможность сохранить их в redux и изменить их один раз
      isSearch.current = true;
    }
  }, [])

  // Если !isSearch.current то выводи запрос и параметры при первом рендере, и больше не выводи

  useEffect(() => {
    if (!isSearch.current) {
      dispatch(fetchPizzas(sortBy, categoryBtn))
    }
    // один раз меняем запрос при первом рендере
    isSearch.current = false;
  }, [sortBy, categoryBtn])

  useEffect(() => {
    dispatch(fetchAuth())
  }, [])

  const onClickCategoryBtn = useCallback((items:TypeCategoryBtn) => {
    dispatch(actions.setCategoryBtn(items))
  }, [])

  const changeActivePriceHandler = (id:number) => {
    dispatch(actions.setCheckedPlusPizzas(id))
  }

  const handlerSortBy = useCallback((items:TypeSortItems) => {
    dispatch(actions.setSortBy(items))
  }, [])

  return (
    <>
      <CartList 
        activeCategory={categoryBtn.category}
        onClickCategory={onClickCategoryBtn}
        onAdd={onAddHandlerCart} 
        pizzas={pizzas} 
        activeSortType={sortBy.type}
        onClickSortBy={handlerSortBy}
        setPlusChecked={changeActivePriceHandler}
      />
    </>
  )
}
