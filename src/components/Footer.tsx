import style from '../styles/footer.module.css'

export function Footer (): JSX.Element {
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
