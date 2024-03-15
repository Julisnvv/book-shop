import { useState } from 'react'
import { useSelector } from 'react-redux'
import { languages } from '../config/languages/index.js'
import { Title } from '../components/Title'
import close from '../img/cross.svg'
import basket from '../img/basket.svg'
import style from '../styles/favorite.module.css'

export function FavoritePage () {
  // Hooks
  const language = useSelector(state => state.language.value)
  const favoriteBooks = Object.keys(localStorage)
    .filter(key => key.startsWith('favoriteBook_'))
    .map(key => JSON.parse(localStorage.getItem(key)))

  // State
  const [deletedBooks, setDeletedBooks] = useState([])

  // Methods
  function handleDeleteClick (isbn13) {
    const localStorageKey = `favoriteBook_${isbn13}`
    localStorage.removeItem(localStorageKey)
    setDeletedBooks([...deletedBooks, isbn13])
  }

  // Template
  return (
    <div>
      <Title name={languages[language].favoritePage.title} />
      <div>
      {favoriteBooks.map(book => {
        if (deletedBooks.includes(book.isbn13)) {
          return null // Пропустить отображение удаленной книги
        }
        return (
            <div key={book.isbn13}>
              <div className={style.book}>
                <div className={style.imageContainer}>
                  <img src={book.image} alt="book" />
                </div>
                <div className={style.mainContainer}>
                  <div className={style.titleContainer}>
                    <p className={style.h} style={{ fontSize: '23px' }}>{book.title}</p>
                    <p className={style.p}>{book.subtitle}</p>
                  </div>
                  <div className={style.infoContainer}>
                    <p className={style.p}>Authors: {book.authors}</p>
                    <p className={style.p}>Pages: {book.pages}</p>
                    <p className={style.p}>Year: {book.year}</p>
                    <p className={style.p}>Rating: {book.rating}</p>
                  </div>
                  <p className={style.h} style={{ fontSize: '23px' }}>{book.price}</p>
                </div>
                <div className={style.iconContainer}>
                  <img
                    className={style.close}
                    src={close} alt="close"
                    onClick={() => handleDeleteClick(book.isbn13)}
                    style={{ width: '30px', height: '30px', cursor: 'pointer' }}
                  />
                  <img className={style.basket} src={basket} alt="basket" style={{ width: '30px', height: '30px', cursor: 'pointer', marginBottom: '30px' }} />
                </div>
              </div>
              <div className={style.line}></div>
            </div>
        )
      })}
      </div>
    </div>
  )
}
