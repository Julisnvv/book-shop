import style from '../styles/book.module.css'

export function BookInfo (props) {
  // Template
  return (
    <div className={style.infoContainer}>
      <p className={style.p}>Authors: {props.authors}</p>
      <p className={style.p}>Publisher: {props.publisher}</p>
      <p className={style.p}>Pages: {props.pages}</p>
      <p className={style.p}>Year: {props.year}</p>
      <p className={style.p}>Rating: {props.rating}</p>
    </div>
  )
}
