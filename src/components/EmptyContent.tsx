import React from 'react'
import empty from '../img/no-result.svg'
import style from '../styles/favoriteAndBasket.module.css'

interface EmptyContentProps {
  text: string
}

export function EmptyContent (props: EmptyContentProps) {
  // Template
  return (
    <div className={style.emptyContainer}>
      <img src={empty} alt="empty" style={{ width: '80px', height: '80px' }} />
      <p className={style.p}>{props.text}</p>
    </div>
  )
}
