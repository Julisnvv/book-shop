import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { languages } from '../config/languages/index.js'
import { removeBasketBook, removeBasketAllBooks } from '../redux/books-slice'
import { getBasketBooks } from '../helpers/localStorage'
import { calculateTotalCost } from '../helpers/calculateCost'
import { Title } from '../components/Title'
import { BasketBook } from '../components/BasketBook'
import { EmptyContent } from '../components/EmptyContent'
import style from '../styles/favoriteAndBasket.module.css'

export function BasketPage () {
  // Hooks
  const dispatch = useDispatch()
  const language = useSelector(state => state.language.value)
  const [deletedBooks, setDeletedBooks] = useState([])

  // Variables
  const basketBooks = getBasketBooks()
  const totalCost = calculateTotalCost(basketBooks)

  // Methods
  function handleDeleteClick (isbn13) {
    dispatch(removeBasketBook(isbn13))
    setDeletedBooks(prevDeletedBooks => [...prevDeletedBooks, isbn13])
  }

  function handleDeleteAllClick () {
    dispatch(removeBasketAllBooks())
    setDeletedBooks(prevDeletedBooks => [...prevDeletedBooks, ...basketBooks.map(book => book.isbn13)])
  }

  // Template
  return (
    <>
      <Title name={languages[language].basketPage.title} />
      {basketBooks.length === 0
        ? (
          <EmptyContent text={languages[language].basketPage.emptyText} />
          )
        : (
        <>
          <div className={style.buttonContainer}>
            <div className={style.totalContainer}>
              <p>{languages[language].basketPage.totalCountText} {basketBooks.length}</p>
              <p>{languages[language].basketPage.totalCostText} {totalCost}$</p>
            </div>
            <button onClick={handleDeleteAllClick} className={style.button}>
              {languages[language].basketPage.buttonDelAll}
            </button>
          </div>
          <div className={style.line}></div>
          {basketBooks.map(book => {
            if (deletedBooks.includes(book.isbn13)) {
              return null
            }
            return (
              <BasketBook
                key={book.isbn13}
                book={book}
                handleDeleteClick={handleDeleteClick}
              />
            )
          })}
        </>
          )}
    </>
  )
}
