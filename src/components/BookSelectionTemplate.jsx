import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { languages } from '../config/languages/index.js'
import style from '../styles/favoriteAndBasket.module.css'

export function BookSelectionTemplate ({ book }) {
  // Hooks
  const language = useSelector(state => state.language.value)

  // Template
  return (
    <>
      <div className={style.imageContainer}>
        <img src={book.image} alt="book" style={{ width: '100%', height: '100%' }}/>
      </div>
      <div className={style.mainContainer}>
        <div className={style.titleContainer}>
          <p className={style.h} style={{ fontSize: '23px' }}>{book.title}</p>
          <p className={style.p}>{book.subtitle}</p>
          <p className={style.p}>isbn: {book.isbn13}</p>
        </div>
        <NavLink to={`/books/${book.isbn13}`} style={{ textDecoration: 'none' }}>
          <p className={style.readMore}>{languages[language].favoritePage.readMore}</p>
        </NavLink>
        <p className={style.h} style={{ fontSize: '23px' }}>{book.price}</p>
      </div>
    </>
  )
}
