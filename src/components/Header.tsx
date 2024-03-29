import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setLanguage } from '../redux/language-slice'
import { AppDispatch } from '../redux/store'
import { SearchForm } from './SearchForm'
import { Menu } from './Menu'
import favorite from '../img/favorite.svg'
import basket from '../img/in-basket.svg'
import style from '../styles/header.module.css'

export function Header (): JSX.Element {
  // Hooks
  const dispatch = useDispatch<AppDispatch>()

  // Methods
  function toggleLang (event: React.ChangeEvent<HTMLSelectElement>): void {
    dispatch(setLanguage(event.target.value))
  }

  // Template
  return (
    <>
      <div className={style.header}>
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <p className={style.logo}>BOOKSTORE</p>
        </NavLink>
        <SearchForm />
        <div className={style.userMenu}>
          <NavLink to='/favorite'>
            <img
              src={favorite}
              alt='favorite'
              className={style.icon}
            />
          </NavLink>
          <NavLink to='/basket'>
            <img
              src={basket}
              alt='basket'
              className={style.icon}
            />
          </NavLink>
          <select
            className={style.select}
            name='language'
            onChange={toggleLang}>
              <option value='en'>English</option>
              <option value='ru'>Русский</option>
          </select>
          <Menu />
        </div>
      </div>
      <div className={style.line}></div>
    </>
  )
}
