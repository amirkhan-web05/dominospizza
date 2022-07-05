import React, { useEffect } from 'react'
import { SnackList } from '../../components/SnackData/SnackList/SnackList'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchPlusCart, fetchPostCart } from '../../redux/actions/action-cart'
import { fetchSnacks } from '../../redux/actions/action-items'
import { TypeSnackItems } from '../../types'

export const SnackPages = () => {
  const dispatch = useAppDispatch()
  const snacks = useAppSelector(state => state.snacks.snacks)
  const cart = useAppSelector(state => state.cart.cart)

  console.log(cart)

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
