import { useState } from 'react'
import { useSelector } from 'react-redux'
import { languages } from '../config/languages/index.js'
import { handleFavoriteDelete, handleFavoriteDeleteAll, handleAddToBasket } from '../helpers/localStorage.js'
import { Title } from '../components/Title'
import { FavoriteBook } from '../components/FavoriteBook'
import { EmptyContent } from '../components/EmptyContent'
import style from '../styles/favoriteAndBasket.module.css'

export function FavoritePage () {
  // Hooks
  const language = useSelector(state => state.language.value)
  const favoriteBooks = Object.keys(localStorage)
    .filter(key => key.startsWith('favoriteBook_'))
    .map(key => JSON.parse(localStorage.getItem(key)))

  // State
  const [deletedBooks, setDeletedBooks] = useState([])

  // Methods
  function handleDeleteClick (isbn13) {
    handleFavoriteDelete(isbn13, setDeletedBooks)
  }

  function handleDeleteAllClick () {
    handleFavoriteDeleteAll(setDeletedBooks)
  }

  function handleAddToBasketClick (isbn13) {
    handleAddToBasket(isbn13, setDeletedBooks)
  }

  // Template
  return (
    <div>
      <Title name={languages[language].favoritePage.title} />
      {favoriteBooks.length === 0
        ? (
          <EmptyContent text={languages[language].favoritePage.emptyText} />
          )
        : (
      <div>
        <div className={style.buttonContainer}>
          <p>{languages[language].favoritePage.totalCountText} {favoriteBooks.length}</p>
          <button onClick={() => handleDeleteAllClick()} className={style.button}>{languages[language].favoritePage.buttonDelAll}</button>
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
      </div>
          )}
    </div>
  )
}
