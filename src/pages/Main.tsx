import { useSelector } from 'react-redux'
import { languages } from '../config/languages/index.ts'
import { Title } from '../components/Title.tsx'
import { CardList } from '../components/CardList.tsx'

export function MainPage (): JSX.Element {
  // Hooks
  const language = useSelector((state: any) => state.language.value)

  // Template
  return (
    <>
      <Title name={languages[language as keyof typeof languages].mainPage.title} />
      <CardList />
    </>
  )
}
