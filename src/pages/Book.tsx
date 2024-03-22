import { useNavigate } from 'react-router-dom'
import { BookProfile } from '../components/BookProfile'
import back from '../img/left-arrow.svg'

export function BookPage (): JSX.Element {
  // Hooks
  const navigate = useNavigate()

  // Methods
  function handleGoBack (): void {
    navigate(-1)
  }

  // Template
  return (
    <>
      <img
        src={back}
        alt='back'
        style={{ width: '30px', height: '30px', cursor: 'pointer', marginBottom: '20px' }}
        onClick={handleGoBack}
      />
      <BookProfile />
    </>
  )
}
