import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { languages } from '../config/languages/index.ts'
import { removeBasketBook, removeBasketAllBooks } from '../redux/books-slice.js'
import { getBasketBooks } from '../helpers/localStorage.ts'
import { calculateTotalCost } from '../helpers/calculateCost.ts'
import { Title } from '../components/Title.tsx'
import { BasketBook } from '../components/BasketBook.tsx'
import { EmptyContent } from '../components/EmptyContent.tsx'
import {BookData} from '../types/BookData'
import style from '../styles/favoriteAndBasket.module.css'

export function BasketPage (): JSX.Element {
  // Hooks
  const dispatch = useDispatch()
  const language = useSelector((state: any) => state.language.value)
  const [deletedBooks, setDeletedBooks] = useState<string[]>([])

  // Variables
  const basketBooks = getBasketBooks() as BookData[]
  const totalCost = calculateTotalCost(basketBooks)

  // Methods
  function handleDeleteClick (isbn13: string) {
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
