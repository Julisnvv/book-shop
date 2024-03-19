import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { languages } from '../config/languages/index'
import { fetchSearchData } from '../redux/books-slice'
import { BooksNew } from '../types/interfaces'
import { RootState, AppDispatch } from '../redux/store'
import { Card } from '../components/Card'
import { EmptyContent } from '../components/EmptyContent'
import { Pagination } from '../components/Pagination'
import style from '../styles/search.module.css'

export function SearchResultPage (): JSX.Element {
  // Hooks
  const dispatch = useDispatch<AppDispatch>()
  const { query, page: pageNumberCurrent } = useParams<{query: string, page: string}>()
  const { searchData, pagesCounter } = useSelector((state: RootState) => state.books)
  const [isLoading, setIsLoading] = useState(true)
  const language = useSelector((state: RootState) => state.language.value)

  useEffect(() => {
    setIsLoading(true)
    dispatch(fetchSearchData({ search: String(query), page: Number(pageNumberCurrent) }))
      .finally(() => setIsLoading(false))
  }, [dispatch, query, pageNumberCurrent])

  // Methods
  function renderSearchBooks () {
    if (isLoading) {
      return <div className={style.poppins}>{languages[language as keyof typeof languages].searchPage.loadingText}</div>
    }

    if (searchData.length) {
      return searchData.map((book: BooksNew) => (
        <Card key={book.isbn13} {...book} />
      ))
    }

    return <EmptyContent text={languages[language as keyof typeof languages].searchPage.emptyText} />
  }

  // Template
  return (
    <>
      <p className={style.title}>{languages[language as keyof typeof languages].searchPage.title}: {query}</p>
      <div className={style.cardList}>
        {renderSearchBooks()}
      </div>
      <Pagination pageNumberCurrent={Number(pageNumberCurrent)} pagesCounter={pagesCounter} activePage={Number(pageNumberCurrent)} />
    </>
  )
}
