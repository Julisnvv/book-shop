import { NavLink } from 'react-router-dom'
import { BookIcons } from './BookIcons'
import { BookImage } from './BookImage'
import { BookData } from '../types/BookData'
import style from '../styles/card.module.css'

interface CardProps extends BookData {
  isbn13: string;
}

export function Card (props: CardProps): JSX.Element {
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
