import { BookSelectionTemplate } from './BookSelectionTemplate'
import { BasketBookProps } from '../types/interfacesProps'
import close from '../img/cross.svg'
import style from '../styles/favoriteAndBasket.module.css'

export function BasketBook ({ book, handleDeleteClick }: BasketBookProps): JSX.Element {
  // Template
  return (
    <div key={book.isbn13}>
      <div className={style.book}>
        <BookSelectionTemplate {...book} />
        <div className={style.iconContainer}>
          <img
            src={close}
            alt='close'
            onClick={() => handleDeleteClick(book.isbn13)}
            style={{ width: '30px', height: '30px', cursor: 'pointer' }}
          />
        </div>
      </div>
      <div className={style.line}></div>
    </div>
  )
}
