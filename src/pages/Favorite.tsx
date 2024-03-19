import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { languages } from '../config/languages/index.ts'
import { removeFavoriteBook, removeFavoriteAllBooks } from '../redux/books-slice.js'
import { handleAddToBasket, getFavoriteBooks } from '../helpers/localStorage.ts'
import { Title } from '../components/Title.tsx'
import { FavoriteBook } from '../components/FavoriteBook.tsx'
import { EmptyContent } from '../components/EmptyContent.tsx'
import { BookData } from '../types/BookData.ts'
import style from '../styles/favoriteAndBasket.module.css'

export function FavoritePage (): JSX.Element {
  // Hooks
  const dispatch = useDispatch()
  const language = useSelector((state: any) => state.language.value)
  const [deletedBooks, setDeletedBooks] = useState<string[]>([])
  const favoriteBooks = getFavoriteBooks() as BookData[]

  // Methods
  function handleDeleteClick (isbn13: string) {
    dispatch(removeFavoriteBook(isbn13))
    setDeletedBooks(prevDeletedBooks => [...prevDeletedBooks, isbn13])
  }

  function handleDeleteAllClick () {
    dispatch(removeFavoriteAllBooks())
    setDeletedBooks(prevDeletedBooks => [...prevDeletedBooks, ...favoriteBooks.map(book => book.isbn13)])
  }

  function handleAddToBasketClick (isbn13: string) {
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
