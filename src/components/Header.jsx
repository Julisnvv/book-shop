import { useDispatch } from 'react-redux'
import { setLanguage } from '../redux/language-slice'

export function Header () {
  // Hooks
  const dispatch = useDispatch()

  // Methods
  const toggleLang = (event) => {
    dispatch(setLanguage(event.target.value))
  }

  // Template
  return (
    <div>
      <p>Header</p>
      <select
        className='select'
        name="language"
        onChange={toggleLang}>
          <option value="en">English</option>
          <option value="ru">Русский</option>
      </select>
    </div>
  )
}
