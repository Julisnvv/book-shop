import { useSelector } from 'react-redux'
import { languages } from '../config/languages/index.js'
import { Title } from '../components/Title'
import { CardList } from '../components/CardList'

export function MainPage () {
  // Hooks
  const language = useSelector(state => state.language.value)

  // Template
  return (
    <>
      <Title name={languages[language].mainPage.title} />
      <CardList />
    </>
  )
}
