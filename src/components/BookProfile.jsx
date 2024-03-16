import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSingleData } from '../redux/books-slice'
import { setImage } from '../redux/image-preview-slice'
import { checkLocalStorageData, handleFavoriteToggle, handleBasketToggle } from '../helpers/localStorage'
import { BookInfo } from './BookInfo'
import { Modal } from './Modal'
import basket from '../img/basket.svg'
import favorite from '../img/favorite.svg'
import inFavorite from '../img/in-favorite.svg'
import inBasket from '../img/in-basket.svg'
import style from '../styles/book.module.css'

export function BookProfile () {
  // Hooks
  const dispatch = useDispatch()
  const { isbn13 } = useParams()
  const book = useSelector((state) => state.books.singleData)
  const [isOpen, setIsOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isBasket, setIsBasket] = useState(false)

  useEffect(() => {
    dispatch(fetchSingleData(isbn13))
    checkLocalStorageData(book, setIsFavorite, setIsBasket)
  }, [dispatch, isbn13, book.isbn13])

  // Methods
  function toggle () {
    setIsOpen(!isOpen)
  }

  function handleClickImage () {
    dispatch(setImage(book.image))
    toggle()
  }

  function handleFavoriteClick () {
    handleFavoriteToggle(book, isFavorite, setIsFavorite)
  }

  function handleBasketClick () {
    handleBasketToggle(book, isBasket, setIsBasket)
  }

  // Template
  return (
    <div className={style.book}>
      <div className={style.mainContainer}>
        <div className={style.imageContainer}>
          <img
            src={book.image}
            alt="book"
            style={{ cursor: 'pointer', height: '100%' }}
            onClick={handleClickImage}
          />
        </div>
        <div className={style.header}>
          <div className={style.titleContainer}>
            <h1 className={style.h}>{book.title}</h1>
            <p className={style.p} style={{ fontSize: '15px' }}>isbn: {book.isbn13}</p>
          </div>
          <p className={style.p}>{book.subtitle}</p>
          <BookInfo book={book} />
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
  )
}
