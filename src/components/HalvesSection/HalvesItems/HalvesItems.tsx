import React from 'react'
import { TypeHalvesItems } from '../../../types'

import styles from './HalvesItems.module.scss'

export const HalvesItems:React.FC<TypeHalvesItems> = ({id, name, price, setActiveHalves, activeHalves, description, images}) => {
  return (
    <div onClick={() => setActiveHalves(id)} className={styles.items}>
      <img width={150} src={images} alt="" />
      <div>
        <h5>{name}</h5>
        <p>{description}</p>
        <h4>{price} ₽</h4>
      </div>
    </div>
  )
}
