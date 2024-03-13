import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from './Card'
import { fetchNewData } from '../redux/books-slice'
import style from '../styles/card.module.css'

export function CardList () {
  // Hooks
  const dispatch = useDispatch()
  const books = useSelector((state) => state.books.newData)

  useEffect(() => {
    dispatch(fetchNewData())
  }, [dispatch])

  if (!Array.isArray(books) || books.length === 0) {
    return <div className={style.poppins}>Loading...</div>
  }

  // Template
  return (
    <div className={style.cardList}>
      {books.map((book) => (
        <Card key={book.isbn13} {...book} />
      ))}
    </div>
  )
}
