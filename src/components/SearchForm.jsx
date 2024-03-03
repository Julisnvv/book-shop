import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import magnifyingGlass from '../img/magnifying-glass.svg'
import style from '../styles/search.module.css'

export function SearchForm () {
  // Hooks
  const { query: queryCurrent } = useParams()
  const [query, setQuery] = useState(queryCurrent)
  const navigate = useNavigate()

  // Methods
  const handleSubmit = (event) => {
    event.preventDefault()
    setQuery('')
    navigate(`/posts/search/${query}`)
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  // Template
  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        type="search"
        placeholder="Search"
        className={style.input}
        value={query}
        onChange={handleChange}
      />
      <button type="submit" className={style.button}>
        <img src={magnifyingGlass} alt="magnifying glass" style={{ width: '20px', height: '20px' }} />
      </button>
    </form>
  )
}
