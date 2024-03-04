import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { languages } from '../config/languages/index.js'
import burgerMenu from '../img/menu-burger.svg'
import style from '../styles/menu.module.css'

export function MenuHamburger () {
  // Hooks
  const [isOpen, setIsOpen] = useState(false)

  // Methods
  function toggle () {
    setIsOpen(!isOpen)
  }

  // Template
  return (
    <div className={style.menuContainer}>
      <div className={style.imageMenu}>
        <img
          src={burgerMenu}
          alt="menu"
          onClick={toggle}
          style={{ width: '25px', height: '25px' }}
        />
        <MenuContent isOpen={isOpen} onToggle={toggle} />
      </div>
    </div>
  )
}

function MenuContent (props) {
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
      <NavLink to="/books" className={style.link} onClick={handleLinkClick}>
        {languages[language].menuHamburger.booksPage}
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
