import { useSelector } from 'react-redux'
import { languages } from '../config/languages/index'
import { RootState } from '../redux/store'
import { Title } from '../components/Title'
import { CardList } from '../components/CardList'

export function MainPage (): JSX.Element {
  // Hooks
  const language = useSelector((state: RootState) => state.language.value)

  // Template
  return (
    <>
      <Title name={languages[language as keyof typeof languages].mainPage.title} />
      <CardList />
    </>
  )
}
