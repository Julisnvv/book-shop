import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setImage } from '../redux/image-preview-slice'
import { checkLocalStorageData, handleFavoriteToggle, handleBasketToggle } from '../helpers/localStorage'
import { Modal } from './Modal'
import favorite from '../img/favorite.svg'
import inFavorite from '../img/in-favorite.svg'
import basket from '../img/basket.svg'
import inBasket from '../img/in-basket.svg'
import style from '../styles/card.module.css'

export function Card (props) {
  // Hooks
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isBasket, setIsBasket] = useState(false)

  useEffect(() => {
    checkLocalStorageData(props, setIsFavorite, setIsBasket)
  }, [props.isbn13])

  // Methods
  function toggle () {
    setIsOpen(!isOpen)
  }

  function handleClickImage () {
    dispatch(setImage(props.image))
    toggle()
  }

  function handleFavoriteClick (book) {
    handleFavoriteToggle(book, isFavorite, setIsFavorite)
  }

  function handleBasketClick (book) {
    handleBasketToggle(book, isBasket, setIsBasket)
  }

  // Template
  return (
    <div className={style.card}>
      <div className={style.imageContainer}>
        <img
          src={props.image}
          alt='book'
          onClick={handleClickImage}
          style={{ width: '100%', height: '100%', cursor: 'pointer' }}
        />
      </div>
      <div className={style.titleContainer}>
        <NavLink to={`/books/${props.isbn13}`} style={{ textDecoration: 'none' }}>
          <p className={style.cardTitle}>{props.title}</p>
        </NavLink>
      </div>
      <div className={style.infoContainer}>
        <div className={style.iconContainer}>
          <img
            src={isFavorite ? inFavorite : favorite}
            alt='favorite'
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            onClick={() => handleFavoriteClick(props)}
          />
          <img
            src={isBasket ? inBasket : basket}
            alt='basket'
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            onClick={() => handleBasketClick(props)}
          />
        </div>
        <p className={style.bebas}>{props.price}</p>
      </div>
      {isOpen && (
        <Modal title={props.title} subtitle={props.subtitle} onToggle={toggle}>
          {props.children}
        </Modal>
      )}
    </div>
  )
}
