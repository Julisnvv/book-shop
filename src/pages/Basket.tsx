import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { languages } from '../config/languages/index'
import { removeBasketBook, removeBasketAllBooks } from '../redux/books-slice'
import { Book } from '../types/interfaces'
import { RootState, AppDispatch } from '../redux/store'
import { getBasketBooks } from '../helpers/localStorage'
import { calculateTotalCost } from '../helpers/calculateCost'
import { Title } from '../components/Title'
import { BasketBook } from '../components/BasketBook'
import { EmptyContent } from '../components/EmptyContent'
import style from '../styles/favoriteAndBasket.module.css'

export function BasketPage (): JSX.Element {
  // Hooks
  const dispatch = useDispatch<AppDispatch>()
  const language = useSelector((state: RootState) => state.language.value)
  const [deletedBooks, setDeletedBooks] = useState<string[]>([])
  const basketBooks = getBasketBooks() as Book[]
  const totalCost = calculateTotalCost(basketBooks)

  // Methods
  function handleDeleteClick (isbn13: string): void {
    dispatch(removeBasketBook(isbn13))
    setDeletedBooks(prevDeletedBooks => [...prevDeletedBooks, isbn13])
  }

  function handleDeleteAllClick (): void {
    dispatch(removeBasketAllBooks())
    setDeletedBooks(prevDeletedBooks => [...prevDeletedBooks, ...basketBooks.map(book => book.isbn13)])
  }

  // Template
  return (
    <>
      <Title name={languages[language as keyof typeof languages].basketPage.title} />
      {basketBooks.length === 0
        ? (
          <EmptyContent text={languages[language as keyof typeof languages].basketPage.emptyText} />
          )
        : (
        <>
          <div className={style.buttonContainer}>
            <div className={style.totalContainer}>
              <p>{languages[language as keyof typeof languages].basketPage.totalCountText} {basketBooks.length}</p>
              <p>{languages[language as keyof typeof languages].basketPage.totalCostText} {totalCost}$</p>
            </div>
            <button onClick={handleDeleteAllClick} className={style.button}>
              {languages[language as keyof typeof languages].basketPage.buttonDelAll}
            </button>
          </div>
          <div className={style.line}></div>
          {basketBooks.map((book: Book) => {
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
