import { TypeCartItems } from '../types/index';

export const useTotal = (cart:TypeCartItems[]) => {
  const typePrice = 15

  const totalCount = cart.reduce((acc:number, item:TypeCartItems) => {
    if(item.plusChecked) {
      return acc += item.typePrices && item.count * item.typePrices + typePrice
    } else {
      return acc += item.typePrices && item.count * item.typePrices
    } 
  }, 0)

  return {
    totalCount
  } 
}