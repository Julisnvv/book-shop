import { NavLink } from 'react-router-dom'
import style from '../styles/pagination.module.css'

export function Pagination ({ pageNumberCurrent, pagesCounter, activePage }) {
  // Methods
  function buildPaginationScheme () {
    const prevPageNumber = +pageNumberCurrent - 1
    const nextPageNumber = +pageNumberCurrent + 1
    const scheme = [1, prevPageNumber, +pageNumberCurrent, nextPageNumber, pagesCounter]
    const filteredScheme = scheme.filter((item) => item > 0 && item <= pagesCounter)
    const set = new Set(filteredScheme)
    const result = Array.from(set)

    if (result[0] + 1 !== result[1]) result.splice(1, 0, '...')
    if (result.at(-2) + 1 !== result.at(-1)) result.splice(result.length - 1, 0, '...')

    return result
  }

  function renderPagination () {
    const paginationScheme = buildPaginationScheme()

    return paginationScheme.map((pageNumber, index) => {
      if (pageNumber === '...') {
        return (
          <li className={style.pageItem} key={index}>
            <span className={`${style.pageLink} ${style.peNone}`}>{pageNumber}</span>
          </li>
        )
      }

      return (
        <li className={style.pageItem} key={index}>
          <NavLink
            to={`/posts/pages/${pageNumber}`}
            className={pageNumber === activePage ? `${style.pageLink} ${style.active}` : `${style.pageLink}`}>
              {pageNumber}
          </NavLink>
        </li>
      )
    })
  }

  // Template
  return (
    <nav>
      <ul className={`${style.pagination} mt-3`}>
        {renderPagination()}
      </ul>
    </nav>
  )
}
