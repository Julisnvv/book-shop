import { EmptyContentProps } from '../types/interfacesProps'
import empty from '../img/no-result.svg'
import style from '../styles/favoriteAndBasket.module.css'

export function EmptyContent (props: EmptyContentProps): JSX.Element {
  // Template
  return (
    <div className={style.emptyContainer}>
      <img
        src={empty}
        alt='empty'
        style={{ width: '80px', height: '80px' }}
      />
      <p className={style.p}>{props.text}</p>
    </div>
  )
}
