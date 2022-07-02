import React from 'react'
import { TypeCitiesModalList } from '../../types'
import { CitiesModal } from '../CitiesModal/CitiesModal'
import styles from './CitiesModalList.module.scss'

export const CitiesModalList:React.FC<TypeCitiesModalList> = ({cities, showCity, setClosePopup, setShowCity, popupCities, value, setValue, setPopupCities}) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popup__inner}>
        <button onClick={() => setClosePopup!(false)} style={{marginLeft:0}} className={styles.popup__close}></button>
        <div className='d-flex align-items-center w-80'>
          <input
            value={value}
            onChange={(e) => setValue!(e.target.value)} 
            className={styles.popup__search} 
            placeholder='Введите ваш город' 
            type="text" 
          />
          {cities.map(city => (
            city.name === showCity ? <span key={city.name} className={styles.popup__city}>{city.name}</span> : null
          ))}
        </div>
        <div className={styles.popup__cities}>
          {cities.map(city => (
            <CitiesModal 
              key={city.population} 
              {...city}
              value={value}
              setShowCity={setShowCity}
              setValue={setValue} 
              setClosePopup={setClosePopup}
              popupCities={popupCities} 
              setPopupCities={setPopupCities} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}
