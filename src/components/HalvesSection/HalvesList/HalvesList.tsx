import React from 'react'
import { TypeHalvesList } from '../../../types'
import { HalvesItems } from '../HalvesItems/HalvesItems'

export const HalvesList:React.FC<TypeHalvesList> = ({halves ,activeHalves, setActiveHalves}) => {
  return (
    <>
      {halves.map(item => (
        <HalvesItems key={item.id} {...item} activeHalves={activeHalves} setActiveHalves={setActiveHalves}/>
      ))}
    </>
  )
}
