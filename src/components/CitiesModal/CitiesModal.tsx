import React from 'react'
import { TypeCitiesModal } from '../../types'

import styles from './CitiesModal.module.scss'

export const CitiesModal:React.FC<TypeCitiesModal> = ({name, setShowCity, setClosePopup}) => {
  const onChangeCityHandler = (city:string | boolean) => {
    if (city) {
      setShowCity!(city)
      setClosePopup!(false)
    }
  }

  return (
    <>
      <div onClick={() => onChangeCityHandler(name)} className={styles.cities__name}>{name}</div>
    </>
  )
}
