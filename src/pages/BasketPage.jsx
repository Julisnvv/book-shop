import { useState } from 'react'
import { useSelector } from 'react-redux'
import { languages } from '../config/languages/index.js'
import { Title } from '../components/Title'
import close from '../img/cross.svg'
import empty from '../img/no-result.svg'
import style from '../styles/favoriteAndBasket.module.css'

export function BasketPage () {
  // Hooks
  const language = useSelector(state => state.language.value)
  const basketBooks = Object.keys(localStorage)
    .filter(key => key.startsWith('basketBook_'))
    .map(key => JSON.parse(localStorage.getItem(key)))

  // State
  const [deletedBooks, setDeletedBooks] = useState([])

  // Methods
  function handleDeleteClick (isbn13) {
    const localStorageKey = `basketBook_${isbn13}`
    localStorage.removeItem(localStorageKey)
    setDeletedBooks([...deletedBooks, isbn13])
  }

  function handleDeleteAllClick () {
    const basketBookKeys = Object.keys(localStorage).filter(key =>
      key.startsWith('basketBook_')
    )
    basketBookKeys.forEach(key => {
      localStorage.removeItem(key)
    })
    setDeletedBooks(basketBookKeys.map(key => key.replace('basketBook_', '')))
  }

  // Calculate total cost
  function parsePrice (price) {
    const formattedPrice = price.replace('$', '')
    return parseFloat(formattedPrice)
  }

  const totalCost = basketBooks.reduce((acc, book) => {
    const price = parsePrice(book.price)
    return isNaN(price) ? acc : acc + price
  }, 0)

  // Template
  return (
    <div>
      <Title name={languages[language].basketPage.title} />
      {basketBooks.length === 0
        ? (
        <div className={style.emptyContainer}>
          <img src={empty} alt="empty" style={{ width: '80px', height: '80px' }} />
          <p className={style.p}>{languages[language].basketPage.emptyText}</p>
        </div>
          )
        : (
        <div>
          <div className={style.buttonContainer}>
            <div className={style.totalContainer}>
              <p>{languages[language].basketPage.totalCountText} {basketBooks.length}</p>
              <p>{languages[language].basketPage.totalCostText} {totalCost}$</p>
            </div>
              <button onClick={() => handleDeleteAllClick()} className={style.button}>{languages[language].basketPage.buttonDelAll}</button>
          </div>
          <div className={style.line}></div>
          {basketBooks.map(book => {
            if (deletedBooks.includes(book.isbn13)) {
              return null
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
                  </div>
                </div>
                <div className={style.line}></div>
              </div>
            )
          })}
        </div>
          )}
    </div>
  )
}
