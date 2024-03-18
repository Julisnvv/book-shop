import { useState } from 'react'
import { MenuContent } from './MenuContent'
import burgerMenu from '../img/menu-burger.svg'
import style from '../styles/menu.module.css'

export function Menu () {
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
