import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setLanguage } from '../redux/language-slice'
import { SearchForm } from './SearchForm'
import { MenuHamburger } from './MenuHamburger'
import favorite from '../img/favorite.svg'
import basket from '../img/basket.svg'
import style from '../styles/header.module.css'

export function Header () {
  // Hooks
  const dispatch = useDispatch()

  // Methods
  const toggleLang = (event) => {
    dispatch(setLanguage(event.target.value))
  }

  // Template
  return (
    <>
      <div className={style.header}>
        <p className={style.logo}>BOOKSTORE</p>
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
          <MenuHamburger />
        </div>
      </div>
      <div className={style.line}></div>
    </>
  )
}
