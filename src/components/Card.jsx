import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setImage } from '../redux/image-preview-slice'
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
    const favoriteLocalStorageKey = `favoriteBook_${props.isbn13}`
    const isBookInFavorites = localStorage.getItem(favoriteLocalStorageKey) !== null
    setIsFavorite(isBookInFavorites)

    const basketLocalStorageKey = `basketBook_${props.isbn13}`
    const isBookInBasket = localStorage.getItem(basketLocalStorageKey) !== null
    setIsBasket(isBookInBasket)
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
    const favoriteLocalStorageKey = `favoriteBook_${book.isbn13}`
    if (isFavorite) {
      localStorage.removeItem(favoriteLocalStorageKey)
    } else {
      localStorage.setItem(favoriteLocalStorageKey, JSON.stringify(book))
    }
    setIsFavorite(!isFavorite)
  }

  function handleBasketClick (book) {
    const basketLocalStorageKey = `basketBook_${book.isbn13}`
    if (isBasket) {
      localStorage.removeItem(basketLocalStorageKey)
    } else {
      localStorage.setItem(basketLocalStorageKey, JSON.stringify(book))
    }
    setIsBasket(!isBasket)
  }

  // Template
  return (
    <div>
      <div className={style.card}>
        <div className={style.imageContainer}>
          <img
            src={props.image}
            alt='book'
            onClick={handleClickImage}
            style={{ width: '100%', height: '100%', cursor: 'pointer' }} />
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
      </div>
      {isOpen && (
        <Modal title={props.title} subtitle={props.subtitle} onToggle={toggle}>
          {props.children}
        </Modal>
      )}
    </div>
  )
}
