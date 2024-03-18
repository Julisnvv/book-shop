import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { languages } from '../config/languages/index.js'
import { fetchSearchData } from '../redux/books-slice'
import { Card } from '../components/Card'
import { EmptyContent } from '../components/EmptyContent'
import { Pagination } from '../components/Pagination'
import style from '../styles/search.module.css'

export function SearchResultPage () {
  // Hooks
  const dispatch = useDispatch()
  const { query } = useParams()
  const { page: pageNumberCurrent } = useParams()
  const { searchData, pagesCounter } = useSelector((state) => state.books)
  const [isLoading, setIsLoading] = useState(true)
  const language = useSelector(state => state.language.value)

  useEffect(() => {
    setIsLoading(true)
    dispatch(fetchSearchData({ search: query, page: pageNumberCurrent }))
      .finally(() => setIsLoading(false))
  }, [dispatch, query, pageNumberCurrent])

  // Methods
  function renderSearchBooks () {
    if (isLoading) {
      return <div className={style.poppins}>{languages[language].searchPage.loadingText}</div>
    }

    if (searchData.length) {
      return searchData.map((book) => (
        <Card key={book.isbn13} {...book} />
      ))
    }

    return <EmptyContent text={languages[language].searchPage.emptyText} />
  }

  // Template
  return (
    <>
      <p className={style.title}>{languages[language].searchPage.title}: {query}</p>
      <div className={style.cardList}>
        {renderSearchBooks()}
      </div>
      <Pagination pageNumberCurrent={pageNumberCurrent} pagesCounter={pagesCounter} activePage={+pageNumberCurrent} />
    </>
  )
}
