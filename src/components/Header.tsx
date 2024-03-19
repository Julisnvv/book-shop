import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setLanguage } from '../redux/language-slice'
import { SearchForm } from './SearchForm'
import { Menu } from './Menu'
import favorite from '../img/favorite.svg'
import basket from '../img/in-basket.svg'
import style from '../styles/header.module.css'

export function Header () {
  // Hooks
  const dispatch = useDispatch()

  // Methods
  const toggleLang = (event: any) => {
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
          <NavLink to="/favorite">
            <img
              src={favorite}
              alt="favorite"
              className={style.icon}/>
          </NavLink>
          <NavLink to="/basket">
            <img
              src={basket}
              alt="basket"
              className={style.icon}/>
          </NavLink>
          <select
            className={style.select}
            name="language"
            onChange={toggleLang}>
              <option value="en">English</option>
              <option value="ru">Русский</option>
          </select>
          <Menu />
        </div>
      </div>
      <div className={style.line}></div>
    </>
  )
}
