import { useWhyDidYouUpdate } from 'ahooks'
import React, { memo } from 'react'
import { TypeCategoryList, TypeSortBy } from '../../types'

import styles from './FiltersItems.module.scss'

export const FiltersItems:React.FC<TypeSortBy & TypeCategoryList> = memo(({items, onClickSortBy, activeSortType, categoryBtn, onClickCategory, activeCategory}) => {   
  useWhyDidYouUpdate('', {items, onClickSortBy, activeSortType, categoryBtn, onClickCategory, activeCategory})

  return (
    <div className={styles.filters}>
      <div className='d-flex'>
        {items.map((item, index) => (
          <button 
            key={index} 
            onClick={() => onClickSortBy!(item)} 
            className={activeSortType === item.type ? styles.btn__active : styles.btn__default}
            >
              {item.name}
          </button>
        ))}
      </div>
      <div className={styles.category}>
        {categoryBtn.map((btn, index) => (
          <button 
            key={index} 
            onClick={() => onClickCategory(btn)} 
            className={btn.category === activeCategory ? styles.category__active : styles.category__btn}>
            {btn.category}
          </button>
        ))}
        
      </div>
    </div>
  )
})