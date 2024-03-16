import style from '../styles/book.module.css'

export function BookInfo ({ book }) {
  // Template
  return (
    <div className={style.infoContainer}>
      <p className={style.p}>Authors: {book.authors}</p>
      <p className={style.p}>Publisher: {book.publisher}</p>
      <p className={style.p}>Pages: {book.pages}</p>
      <p className={style.p}>Year: {book.year}</p>
      <p className={style.p}>Rating: {book.rating}</p>
    </div>
  )
}
