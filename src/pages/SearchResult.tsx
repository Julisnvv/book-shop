import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { languages } from '../config/languages/index.ts'
import { fetchSearchData } from '../redux/books-slice.js'
import { Card } from '../components/Card.tsx'
import { EmptyContent } from '../components/EmptyContent.tsx'
import { Pagination } from '../components/Pagination.tsx'
import {BookData} from '../types/BookData.ts'
import style from '../styles/search.module.css'

interface SearchResultPageParams {
  query: string
  page?: string
}

export function SearchResultPage (): JSX.Element {
  // Hooks
  const dispatch = useDispatch()
  const { query, page: pageNumberCurrent } = useParams<SearchResultPageParams>()
  const { searchData, pagesCounter } = useSelector((state: any) => state.books)
  const [isLoading, setIsLoading] = useState(true)
  const language = useSelector((state: any) => state.language.value)

  useEffect(() => {
    setIsLoading(true)
    dispatch(fetchSearchData({ search: query, page: pageNumberCurrent }))
      .finally(() => setIsLoading(false))
  }, [dispatch, query, pageNumberCurrent])

  // Methods
  function renderSearchBooks () {
    if (isLoading) {
      return <div className={style.poppins}>{languages[language as keyof typeof languages].searchPage.loadingText}</div>
    }

    if (searchData.length) {
      return searchData.map((book: BookData) => (
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
      <Pagination pageNumberCurrent={pageNumberCurrent} pagesCounter={pagesCounter} activePage={+pageNumberCurrent} />
    </>
  )
}
