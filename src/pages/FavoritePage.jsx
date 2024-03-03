import { useSelector } from 'react-redux'
import { languages } from '../config/languages/index.js'
import { Pagination } from '../components/Pagination'
import { Title } from '../components/Title'

export function FavoritePage () {
  // Hooks
  const language = useSelector(state => state.language.value)

  // Template
  return (
    <div>
      <Title name={languages[language].favoritePage.title} />
      <Pagination />
    </div>
  )
}
