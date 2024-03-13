import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom'
import { fetchSingleData } from '../redux/books-slice'
import back from '../img/left-arrow.svg'
import basket from '../img/basket.svg'
import favorite from '../img/favorite.svg'
import style from '../styles/book.module.css'

export function BookPage () {
  // Hooks
  const { isbn13 } = useParams()
  const dispatch = useDispatch()
  const book = useSelector((state) => state.books.singleData)

  useEffect(() => {
    dispatch(fetchSingleData(isbn13))
  }, [dispatch, isbn13])

  // Template
  return (
    <div>
      <NavLink to="/">
        <img
          src={back}
          alt="back"
          style={{ width: '30px', height: '30px', cursor: 'pointer', marginBottom: '20px' }}
        />
      </NavLink>
      <div className={style.book}>
        <div className={style.mainContainer}>
          <div className={style.imageContainer}>
            <img
              src={book.image}
              alt="book"
            />
          </div>
          <div className={style.header}>
            <div className={style.titleContainer}>
              <h1 className={style.h}>{book.title}</h1>
              <p className={style.p} style={{ fontSize: '15px' }}>isbn: {book.isbn13}</p>
            </div>
            <p className={style.p}>{book.subtitle}</p>
            <div className={style.infoContainer}>
              <p className={style.p}>Authors: {book.authors}</p>
              <p className={style.p}>Publisher: {book.publisher}</p>
              <p className={style.p}>Pages: {book.pages}</p>
              <p className={style.p}>Year: {book.year}</p>
              <p className={style.p}>Rating: {book.rating}</p>
            </div>
            <div className={style.basket}>
              <p className={style.h} style={{ fontSize: '26px' }}>{book.price}</p>
              <div className={style.icons}>
                <img src={favorite} alt="favorite" style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
                <img src={basket} alt="basket" style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
              </div>
            </div>
          </div>
        </div>
        <p className={style.p} style={{ fontSize: '17px' }}>{book.desc}</p>
      </div>
    </div>
  )
}
