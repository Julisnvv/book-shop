import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { languages } from '../config/languages/index'
import { RootState } from '../redux/store'
import { MenuProps } from '../types/interfacesProps'
import style from '../styles/menu.module.css'

export function MenuContent (props: MenuProps): JSX.Element {
  // Hooks
  const language = useSelector((state: RootState) => state.language.value)

  // Methods
  function handleLinkClick (): void {
    props.onToggle()
  }

  // Template
  return (
    <div className={`${style.content} ${props.isOpen ? style.isOpen : ''}`}>
      <NavLink to='/' className={style.link} onClick={handleLinkClick}>
        {languages[language as keyof typeof languages].menuHamburger.mainPage}
      </NavLink>
      <NavLink to='/favorite' className={style.link} onClick={handleLinkClick}>
        {languages[language as keyof typeof languages].menuHamburger.favoritePage}
      </NavLink>
      <NavLink to='/basket' className={style.link} onClick={handleLinkClick}>
        {languages[language as keyof typeof languages].menuHamburger.basketPage}
      </NavLink>
    </div>
  )
}
