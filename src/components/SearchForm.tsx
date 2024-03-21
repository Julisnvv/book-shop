import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import magnifyingGlass from '../img/magnifying-glass.svg'
import style from '../styles/search.module.css'

export function SearchForm (): JSX.Element {
  // Hooks
  const { query: queryCurrent, page: pageCurrent } = useParams()
  const [query, setQuery] = useState(queryCurrent || '')
  const [page, setPage] = useState(pageCurrent)
  const navigate = useNavigate()

  // Methods
  function handleSubmit (event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    setQuery('')
    navigate(`/search/${query}/${page}`)
    setPage('1')
  }

  function handleChange (event: React.ChangeEvent<HTMLInputElement>): void {
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
