import { useSelector } from 'react-redux'
import { languages } from '../config/languages/index.js'
import { Title } from '../components/Title'
import { CardList } from '../components/CardList'

export function BooksPage () {
  // Hooks
  const language = useSelector(state => state.language.value)

  // Template
  return (
    <div>
      <Title name={languages[language].booksPage.title} />
      <CardList />
    </div>
  )
}
