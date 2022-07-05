import React from 'react'
import { TypeSnackList } from '../../../types'
import { SnackItems } from '../SnackItems/SnackItems'

import styles from './SnackList.module.scss'

export const SnackList:React.FC<TypeSnackList> = ({snacks, onClickAdd}) => {
  return (
    <div className='container'>
        <h3 className={styles.snacks__title}>Закуски</h3>
        <div className="d-flex align-items-center flex-wrap justify-content-center">
            {snacks.map(snack => (
                <SnackItems key={snack.id} {...snack} onClickAdd={onClickAdd}/>
            ))}
        </div>
    </div>
  )
}
