import { NavLink } from 'react-router-dom'
import { BooksNew } from '../types/interfaces'
import { BookIcons } from './BookIcons'
import { BookImage } from './BookImage'
import style from '../styles/card.module.css'

export function Card (props: BooksNew): JSX.Element {
  // Template
  return (
    <div className={style.card}>
      <div className={style.imageContainer}>
        <BookImage {...props} />
      </div>
      <div className={style.titleContainer}>
        <NavLink to={`/books/${props.isbn13}`} style={{ textDecoration: 'none' }}>
          <p className={style.cardTitle}>{props.title}</p>
        </NavLink>
      </div>
      <div className={style.infoContainer}>
        <div className={style.iconContainer}>
          <BookIcons {...props} />
        </div>
        <p className={style.bebas}>{props.price}</p>
      </div>
    </div>
  )
}
