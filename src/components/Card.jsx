import { NavLink } from 'react-router-dom'
import { BookIcons } from '../components/BookIcons'
import { BookImage } from '../components/BookImage'
import style from '../styles/card.module.css'

export function Card (props) {
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
