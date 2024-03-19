import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNewData } from '../redux/books-slice'
import { RootState, AppDispatch } from '../redux/store'
import { BooksNew } from '../types/interfaces'
import { Card } from './Card'
import style from '../styles/card.module.css'

export function CardList (): JSX.Element {
  // Hooks
  const dispatch = useDispatch<AppDispatch>()
  const books = useSelector((state: RootState) => state.books.newData)

  useEffect(() => {
    dispatch(fetchNewData())
  }, [dispatch])

  if (!Array.isArray(books) || books.length === 0) {
    return <div className={style.poppins}>Loading...</div>
  }

  // Template
  return (
    <div className={style.cardList}>
      {books.map((book: BooksNew) => (
        <Card key={book.isbn13} {...book} />
      ))}
    </div>
  )
}
