import { useSelector } from 'react-redux'
import { languages } from '../config/languages/index.js'
import { Title } from '../components/Title'

export function BasketPage () {
  // Hooks
  const language = useSelector(state => state.language.value)
  const basketBooks = Object.keys(localStorage)
    .filter(key => key.startsWith('basketBook_'))
    .map(key => JSON.parse(localStorage.getItem(key)))

  // Template
  return (
    <div>
      <Title name={languages[language].basketPage.title} />
      <div>
        {basketBooks.map(book => (
          <div key={book.isbn13}>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            {/* Добавьте остальную информацию о книге, которую вы хотите отобразить */}
          </div>
        ))}
      </div>
    </div>
  )
}
