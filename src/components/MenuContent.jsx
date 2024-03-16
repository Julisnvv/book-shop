import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { languages } from '../config/languages/index.js'
import style from '../styles/menu.module.css'

export function MenuContent (props) {
  // Hooks
  const language = useSelector(state => state.language.value)

  // Methods
  function handleLinkClick () {
    props.onToggle()
  }

  // Template
  return (
    <div className={`${style.content} ${props.isOpen ? style.isOpen : ''}`}>
      <NavLink to="/" className={style.link} onClick={handleLinkClick}>
        {languages[language].menuHamburger.mainPage}
      </NavLink>
      <NavLink to="/favorite" className={style.link} onClick={handleLinkClick}>
        {languages[language].menuHamburger.favoritePage}
      </NavLink>
      <NavLink to="/basket" className={style.link} onClick={handleLinkClick}>
        {languages[language].menuHamburger.basketPage}
      </NavLink>
    </div>
  )
}
