import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchData } from '../redux/posts-slice'
import style from '../styles/sorting.module.css'

export function Sorting () {
  // Hooks
  const dispatch = useDispatch()
  const [sortBy, setSort] = useState('')

  useEffect(() => {
    dispatch(fetchData({ ordering: sortBy }))
  }, [dispatch, sortBy])

  // Methods
  function handleSortChange (event) {
    setSort(event.target.value)
  }

  // Template
  return (
    <div className={style.sortingContainer}>
      <select className={style.select} onChange={handleSortChange}>
        <option value="date">Date</option>
        <option value="title">Title</option>
        <option value="text">Text</option>
        <option value="lesson_num">Lesson_num</option>
      </select>
    </div>
  )
}
