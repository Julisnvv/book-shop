import { NavLink } from 'react-router-dom'
import style from '../styles/search.module.css'

export function SearchBook ({ book }) {
  // Template
  return (
    <div key={book.isbn13} className={style.card}>
      <div className={style.imageContainer}>
        <img
          src={book.image}
          alt='book'
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className={style.titleContainer}>
        <NavLink to={`/books/${book.isbn13}`} style={{ textDecoration: 'none' }}>
          <p className={style.cardTitle}>{book.title}</p>
        </NavLink>
      </div>
      <div className={style.infoContainer}>
        <p className={style.poppins}>{book.isbn13}</p>
        <p className={style.bebas}>{book.price}</p>
      </div>
    </div>
  )
}
