import { BookSelectionTemplate } from './BookSelectionTemplate'
import {BookData} from '../types/BookData'
import close from '../img/cross.svg'
import basket from '../img/in-basket.svg'
import style from '../styles/favoriteAndBasket.module.css'

interface FavoriteBookProps {
  book: BookData
  handleDeleteClick: (isbn13: string) => void
  handleAddToBasketClick: (isbn13: string) => void
}

export function FavoriteBook ({ book, handleDeleteClick, handleAddToBasketClick }: FavoriteBookProps): JSX.Element {
  // Template
  return (
    <div key={book.isbn13}>
      <div className={style.book}>
        <BookSelectionTemplate {...book} />
        <div className={style.iconContainer}>
          <img
            className={style.close}
            src={close}
            alt="close"
            onClick={() => handleDeleteClick(book.isbn13)}
            style={{ width: '30px', height: '30px', cursor: 'pointer' }}
          />
          <img
            className={style.basket}
            src={basket}
            alt="basket"
            onClick={() => handleAddToBasketClick(book.isbn13)}
            style={{ width: '30px', height: '30px', cursor: 'pointer', marginBottom: '30px' }}
          />
        </div>
      </div>
      <div className={style.line}></div>
    </div>
  )
}