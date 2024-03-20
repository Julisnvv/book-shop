import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { languages } from '../config/languages/index'
import { removeFavoriteBook, removeFavoriteAllBooks } from '../redux/books-slice'
import { Book } from '../types/interfaces'
import { RootState, AppDispatch } from '../redux/store'
import { handleAddToBasket, getFavoriteBooks } from '../helpers/localStorage'
import { Title } from '../components/Title'
import { FavoriteBook } from '../components/FavoriteBook'
import { EmptyContent } from '../components/EmptyContent'
import style from '../styles/favoriteAndBasket.module.css'

export function FavoritePage (): JSX.Element {
  // Hooks
  const dispatch = useDispatch<AppDispatch>()
  const language = useSelector((state: RootState) => state.language.value)
  const [deletedBooks, setDeletedBooks] = useState<string[]>([])
  const favoriteBooks = getFavoriteBooks() as Book[]

  // Methods
  function handleDeleteClick (isbn13: string): void {
    dispatch(removeFavoriteBook(isbn13))
    setDeletedBooks(prevDeletedBooks => [...prevDeletedBooks, isbn13])
  }

  function handleDeleteAllClick (): void {
    dispatch(removeFavoriteAllBooks())
    setDeletedBooks(prevDeletedBooks => [...prevDeletedBooks, ...favoriteBooks.map(book => book.isbn13)])
  }

  function handleAddToBasketClick (isbn13: string): void {
    handleAddToBasket(isbn13, setDeletedBooks)
  }

  // Template
  return (
    <>
      <Title name={languages[language as keyof typeof languages].favoritePage.title} />
      {favoriteBooks.length === 0
        ? (
          <EmptyContent text={languages[language as keyof typeof languages].favoritePage.emptyText} />
          )
        : (
        <>
          <div className={style.buttonContainer}>
            <p>{languages[language as keyof typeof languages].favoritePage.totalCountText} {favoriteBooks.length}</p>
            <button onClick={handleDeleteAllClick} className={style.button}>
                {languages[language as keyof typeof languages].favoritePage.buttonDelAll}
            </button>
          </div>
          <div className={style.line}></div>
          {favoriteBooks.map((book: Book) => {
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
