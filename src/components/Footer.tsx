import React from 'react'
import style from '../styles/footer.module.css'

export function Footer () {
  // Template
  return (
    <>
      <div className={style.line}></div>
      <div className={style.footer}>
        <p>© 2022 Bookstore</p>
        <p>All rights reserved</p>
      </div>
    </>
  )
}
