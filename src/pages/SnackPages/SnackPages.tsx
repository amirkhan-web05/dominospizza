import React, { useEffect } from 'react'
import { SnackList } from '../../components/SnackData/SnackList/SnackList'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchPlusCart, fetchPostCart } from '../../redux/actions/cart/action-cart'
import { fetchSnacks } from '../../redux/actions/items/action-items'
import { selectCartData, selectSnackData } from '../../redux/selectors/selectors'
import { TypeSnackItems } from '../../types'

export const SnackPages = () => {
  const dispatch = useAppDispatch()
  const {snacks} = useAppSelector(selectSnackData)
  const {cart} = useAppSelector(selectCartData)

  useEffect(() => {
    dispatch(fetchSnacks())
  }, [])

  const onAddHandlerCart = (obj:TypeSnackItems):void => {
    const findItems = cart.find(item => item.id === obj.id) 

    if (findItems) {
      const {id, count} = obj
      dispatch(fetchPlusCart(id, count + 1))
    } else {
      dispatch(fetchPostCart(obj))
    }
  }

  return (
    <div>
        <SnackList onClickAdd={onAddHandlerCart} snacks={snacks}/>
    </div>
  )
}
