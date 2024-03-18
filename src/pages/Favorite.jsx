import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { languages } from '../config/languages/index.js'
import { removeFavoriteBook, removeFavoriteAllBooks } from '../redux/books-slice'
import { handleAddToBasket, getFavoriteBooks } from '../helpers/localStorage'
import { Title } from '../components/Title'
import { FavoriteBook } from '../components/FavoriteBook'
import { EmptyContent } from '../components/EmptyContent'
import style from '../styles/favoriteAndBasket.module.css'

export function FavoritePage () {
  // Hooks
  const dispatch = useDispatch()
  const language = useSelector(state => state.language.value)
  const [deletedBooks, setDeletedBooks] = useState([])
  const favoriteBooks = getFavoriteBooks()

  // Methods
  function handleDeleteClick (isbn13) {
    dispatch(removeFavoriteBook(isbn13))
    setDeletedBooks(prevDeletedBooks => [...prevDeletedBooks, isbn13])
  }

  function handleDeleteAllClick () {
    dispatch(removeFavoriteAllBooks())
    setDeletedBooks(prevDeletedBooks => [...prevDeletedBooks, ...favoriteBooks.map(book => book.isbn13)])
  }

  function handleAddToBasketClick (isbn13) {
    handleAddToBasket(isbn13, setDeletedBooks)
  }

  // Template
  return (
    <>
      <Title name={languages[language].favoritePage.title} />
      {favoriteBooks.length === 0
        ? (
          <EmptyContent text={languages[language].favoritePage.emptyText} />
          )
        : (
        <>
          <div className={style.buttonContainer}>
            <p>{languages[language].favoritePage.totalCountText} {favoriteBooks.length}</p>
            <button onClick={handleDeleteAllClick} className={style.button}>
                {languages[language].favoritePage.buttonDelAll}
            </button>
          </div>
          <div className={style.line}></div>
          {favoriteBooks.map(book => {
            if (deletedBooks.includes(book.isbn13)) {
              return null
            }
            return (
              <FavoriteBook
                key={book.isbn13}
                book={book}
                handleDeleteClick={handleDeleteClick}
                handleAddToBasketClick={handleAddToBasketClick}
              />
            )
          })}
        </>
          )}
    </>
  )
}
