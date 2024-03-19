import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import magnifyingGlass from '../img/magnifying-glass.svg'
import style from '../styles/search.module.css'

export function SearchForm () {
  // Hooks
  const { query: queryCurrent, page: pageCurrent } = useParams()
  const [query, setQuery] = useState<string>(queryCurrent)
  const [page, setPage] = useState<number>(pageCurrent)
  const navigate = useNavigate()

  // Methods
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(`/search/${query}/${page}`)
    setQuery('')
    setPage(1)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  // Template
  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        type="search"
        placeholder="Search..."
        className={style.input}
        value={query}
        onChange={handleChange}
      />
      <button type="submit" className={style.button}>
        <img
          src={magnifyingGlass}
          alt="magnifying glass"
          style={{ width: '20px', height: '20px' }}
        />
      </button>
    </form>
  )
}