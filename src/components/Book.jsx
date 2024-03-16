import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSingleData } from '../redux/books-slice'
import { setImage } from '../redux/image-preview-slice'
import { Modal } from './Modal'
import basket from '../img/basket.svg'
import favorite from '../img/favorite.svg'
import inFavorite from '../img/in-favorite.svg'
import inBasket from '../img/in-basket.svg'
import style from '../styles/book.module.css'

export function Book () {
  // Hooks
  const { isbn13 } = useParams()
  const dispatch = useDispatch()
  const book = useSelector((state) => state.books.singleData)
  const [isOpen, setIsOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isBasket, setIsBasket] = useState(false)

  useEffect(() => {
    dispatch(fetchSingleData(isbn13))
  }, [dispatch, isbn13])

  useEffect(() => {
    const localStorageKey = `favoriteBook_${book.isbn13}`
    const isBookInFavorites = localStorage.getItem(localStorageKey) !== null
    setIsFavorite(isBookInFavorites)

    const basketLocalStorageKey = `basketBook_${book.isbn13}`
    const isBookInBasket = localStorage.getItem(basketLocalStorageKey) !== null
    setIsBasket(isBookInBasket)
  }, [book.isbn13])

  // Methods
  function toggle () {
    setIsOpen(!isOpen)
  }

  function handleClickImage () {
    dispatch(setImage(book.image))
    toggle()
  }

  function handleFavoriteClick () {
    const favoriteLocalStorageKey = `favoriteBook_${book.isbn13}`
    if (isFavorite) {
      localStorage.removeItem(favoriteLocalStorageKey)
    } else {
      localStorage.setItem(favoriteLocalStorageKey, JSON.stringify(book))
    }
    setIsFavorite(!isFavorite)
  }

  function handleBasketClick () {
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
      <div className={style.book}>
        <div className={style.mainContainer}>
          <div className={style.imageContainer}>
            <img
              src={book.image}
              alt="book"
              style={{ cursor: 'pointer' }}
              onClick={handleClickImage}
            />
          </div>
          <div className={style.header}>
            <div className={style.titleContainer}>
              <h1 className={style.h}>{book.title}</h1>
              <p className={style.p} style={{ fontSize: '15px' }}>isbn: {book.isbn13}</p>
            </div>
            <p className={style.p}>{book.subtitle}</p>
            <div className={style.infoContainer}>
              <p className={style.p}>Authors: {book.authors}</p>
              <p className={style.p}>Publisher: {book.publisher}</p>
              <p className={style.p}>Pages: {book.pages}</p>
              <p className={style.p}>Year: {book.year}</p>
              <p className={style.p}>Rating: {book.rating}</p>
            </div>
            <div className={style.basket}>
              <p className={style.h} style={{ fontSize: '26px' }}>{book.price}</p>
              <div className={style.icons}>
                <img
                  src={isFavorite ? inFavorite : favorite}
                  alt="favorite"
                  style={{ width: '30px', height: '30px', cursor: 'pointer' }}
                  onClick={handleFavoriteClick}
                />
                <img
                  src={isBasket ? inBasket : basket}
                  alt="basket"
                  style={{ width: '35px', height: '35px', cursor: 'pointer' }}
                  onClick={handleBasketClick}
                />
              </div>
            </div>
          </div>
        </div>
        <p className={style.p} style={{ fontSize: '17px' }}>{book.desc}</p>
        {isOpen && (
        <Modal onToggle={toggle}>
          {book.children}
        </Modal>
        )}
      </div>
    </div>
  )
}
