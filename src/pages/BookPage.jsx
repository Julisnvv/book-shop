import { useNavigate } from 'react-router-dom'
import { Book } from '../components/Book'
import back from '../img/left-arrow.svg'

export function BookPage () {
  // Hooks
  const navigate = useNavigate()

  // Methods
  function handleGoBack () {
    navigate(-1)
  }

  // Template
  return (
    <div>
      <img
        src={back}
        alt="back"
        style={{ width: '30px', height: '30px', cursor: 'pointer', marginBottom: '20px' }}
        onClick={handleGoBack}
      />
      <Book />
    </div>
  )
}
