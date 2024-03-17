import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { languages } from '../config/languages/index.js'
import { fetchSearchData } from '../redux/books-slice.js'
import { SearchBook } from '../components/SearchBook.jsx'
import { EmptyContent } from '../components/EmptyContent.jsx'
import { Pagination } from '../components/Pagination.jsx'
import style from '../styles/search.module.css'

export function SearchResultPage () {
  // Hooks
  const { query } = useParams()
  const dispatch = useDispatch()
  const { searchData, pagesCounter } = useSelector((state) => state.books)
  const [isLoading, setIsLoading] = useState(true)
  const language = useSelector(state => state.language.value)
  const { page: pageNumberCurrent } = useParams()

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
        <SearchBook key={book.isbn13} book={book} />
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