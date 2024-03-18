import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSingleData } from '../redux/books-slice'
import { BookImage } from './BookImage'
import { BookInfo } from './BookInfo'
import { BookIcons } from './BookIcons'
import style from '../styles/book.module.css'

export function BookProfile () {
  // Hooks
  const dispatch = useDispatch()
  const { isbn13 } = useParams()
  const book = useSelector((state) => state.books.singleData)

  useEffect(() => {
    dispatch(fetchSingleData(isbn13))
  }, [dispatch, isbn13])

  // Template
  return (
    <div className={style.book}>
      <div className={style.mainContainer}>
        <div className={style.imageContainer}>
          <BookImage {...book} />
        </div>
        <div className={style.header}>
          <div className={style.titleContainer}>
            <h1 className={style.h}>{book.title}</h1>
            <p className={style.p} style={{ fontSize: '15px' }}>isbn: {book.isbn13}</p>
          </div>
          <p className={style.p}>{book.subtitle}</p>
          <BookInfo {...book} />
          <div className={style.basket}>
            <p className={style.h} style={{ fontSize: '26px' }}>{book.price}</p>
            <div className={style.icons}>
              <BookIcons {...book} />
            </div>
          </div>
        </div>
      </div>
      <p className={style.p} style={{ fontSize: '17px' }}>{book.desc}</p>
    </div>
  )
}
