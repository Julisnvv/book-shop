import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { languages } from '../config/languages/index'
import { Book } from '../types/interfaces'
import { RootState } from '../redux/store'
import style from '../styles/favoriteAndBasket.module.css'

export function BookSelectionTemplate (props: Book): JSX.Element {
  // Hooks
  const language = useSelector((state: RootState) => state.language.value)

  // Template
  return (
    <>
      <div className={style.imageContainer}>
        <img
          src={props.image}
          alt='book'
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className={style.mainContainer}>
        <div className={style.titleContainer}>
          <p className={style.h} style={{ fontSize: '23px' }}>{props.title}</p>
          <p className={style.p}>{props.subtitle}</p>
          <p className={style.p}>isbn: {props.isbn13}</p>
        </div>
        <NavLink to={`/books/${props.isbn13}`} style={{ textDecoration: 'none' }}>
          <p className={style.readMore}>{languages[language as keyof typeof languages].favoritePage.readMore}</p>
        </NavLink>
        <p className={style.h} style={{ fontSize: '23px' }}>{props.price}</p>
      </div>
    </>
  )
}
