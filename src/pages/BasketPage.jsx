import { useState } from 'react'
import { useSelector } from 'react-redux'
import { languages } from '../config/languages/index.js'
import { handleBasketDelete, handleBasketDeleteAll } from '../helpers/localStorage.js'
import { parsePrice } from '../helpers/parsePrice.js'
import { Title } from '../components/Title'
import { BasketBook } from '../components/BasketBook'
import { EmptyContent } from '../components/EmptyContent'
import style from '../styles/favoriteAndBasket.module.css'

export function BasketPage () {
  // Hooks
  const language = useSelector(state => state.language.value)
  const basketBooks = Object.keys(localStorage)
    .filter(key => key.startsWith('basketBook_'))
    .map(key => JSON.parse(localStorage.getItem(key)))

  // State
  const [deletedBooks, setDeletedBooks] = useState([])

  // Methods
  function handleDeleteClick (isbn13) {
    handleBasketDelete(isbn13, setDeletedBooks)
  }

  function handleDeleteAllClick () {
    handleBasketDeleteAll(setDeletedBooks)
  }

  // Calculate total cost
  const totalCost = basketBooks.reduce((acc, book) => {
    const price = parsePrice(book.price)
    return isNaN(price) ? acc : acc + price
  }, 0)

  // Template
  return (
    <div>
      <Title name={languages[language].basketPage.title} />
      {basketBooks.length === 0
        ? (
          <EmptyContent text={languages[language].basketPage.emptyText} />
          )
        : (
        <div>
          <div className={style.buttonContainer}>
            <div className={style.totalContainer}>
              <p>{languages[language].basketPage.totalCountText} {basketBooks.length}</p>
              <p>{languages[language].basketPage.totalCostText} {totalCost}$</p>
            </div>
              <button onClick={() => handleDeleteAllClick()} className={style.button}>{languages[language].basketPage.buttonDelAll}</button>
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
        </div>
          )}
    </div>
  )
}
