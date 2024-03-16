import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom'
import { languages } from '../config/languages/index.js'
import { fetchSearchData } from '../redux/books-slice'
import noResult from '../img/no-result.svg'
import style from '../styles/search.module.css'

export function SearchResult () {
  // Hooks
  const { query } = useParams()
  const dispatch = useDispatch()
  const { searchData } = useSelector((state) => state.books)
  const [isLoading, setIsLoading] = useState(true)
  const language = useSelector(state => state.language.value)

  useEffect(() => {
    setIsLoading(true)
    dispatch(fetchSearchData({ search: query, limit: 99 }))
      .finally(() => setIsLoading(false))
  }, [dispatch, query])

  // Methods
  function renderSearchBooks () {
    if (isLoading) {
      return <div className={style.poppins}>{languages[language].searchPage.loadingText}</div>
    }

    if (searchData.length) {
      return searchData.map((book) => (
        <div key={book.isbn13} className={style.card}>
          <div className={style.imageContainer}>
            <img
              src={book.image}
              alt='book'
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className={style.titleContainer}>
          <NavLink to={`/books/${book.isbn13}`} style={{ textDecoration: 'none' }}>
            <p className={style.cardTitle}>{book.title}</p>
          </NavLink>
          </div>
          <div className={style.infoContainer}>
            <p className={style.poppins}>{book.isbn13}</p>
            <p className={style.bebas}>{book.price}</p>
          </div>
        </div>
      ))
    }

    return (
      <div className={style.noResult}>
        <p className={style.poppins}>{languages[language].searchPage.emptyText}</p>
        <img src={noResult} alt='no result' style={{ width: '80px', height: '80px' }}/>
      </div>
    )
  }

  // Template
  return (
    <>
    <p className={style.title}>{languages[language].searchPage.title}: {query}</p>
    <div className={style.cardList}>
      {renderSearchBooks()}
    </div>
    </>
  )
}
