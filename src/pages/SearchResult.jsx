import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSearchData } from '../redux/books-slice'

export function SearchResult () {
  // Hooks
  const { query } = useParams()
  const dispatch = useDispatch()
  const { searchData } = useSelector((state) => state.books)

  useEffect(() => {
    dispatch(fetchSearchData({ search: query, limit: 99 }))
  }, [dispatch, query])

  // Methods
  function renderBooks () {
    if (searchData.length) {
      return searchData.map((book) => (
        <div key={book.isbn13}>{book.title}</div>
      ))
    }
    return <div>No result</div>
  }

  // Template
  return (
    <div>
      {renderBooks()}
    </div>
  )
}
