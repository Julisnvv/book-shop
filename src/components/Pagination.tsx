import { useParams, NavLink } from 'react-router-dom'
import { PaginationProps } from '../types/interfacesProps'
import style from '../styles/pagination.module.css'

export function Pagination ({ pageNumberCurrent, pagesCounter, activePage }: PaginationProps): JSX.Element {
  // Hooks
  const { query } = useParams<{ query: string }>()

  // Methods
  function buildPaginationScheme (): (number | string)[] {
    const prevPageNumber = +pageNumberCurrent - 1
    const nextPageNumber = +pageNumberCurrent + 1
    const scheme = [1, prevPageNumber, +pageNumberCurrent, nextPageNumber, pagesCounter]
    const filteredScheme = scheme.filter((item) => item > 0 && item <= pagesCounter)
    const set = new Set(filteredScheme)
    const result = Array.from(set)

    if (result[0] + 1 !== result[1]) result.splice(1, 0, '...')
    if (result[result.length - 2] + 1 !== result[result.length - 1]) result.splice(result.length - 1, 0, '...')

    return result
  }

  function renderPagination (): JSX.Element[] {
    const paginationScheme = buildPaginationScheme()

    return paginationScheme.map((page, index) => {
      if (page === '...') {
        return (
          <li className={style.pageItem} key={index}>
            <span className={`${style.pageLink} ${style.peNone}`}>{page}</span>
          </li>
        )
      }

      return (
        <li className={style.pageItem} key={index}>
          <NavLink
            to={`/search/${query}/${page}`}
            className={page === activePage ? `${style.pageLink} ${style.active}` : `${style.pageLink}`}>
              {page}
          </NavLink>
        </li>
      )
    })
  }

  // Template
  return (
    <nav>
      <ul className={`${style.pagination}`}>
        {renderPagination()}
      </ul>
    </nav>
  )
}
