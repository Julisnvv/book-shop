import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { MainPage } from './pages/MainPage'
import { BookPage } from './pages/BookPage'
import { FavoritePage } from './pages/FavoritePage'
import { BasketPage } from './pages/BasketPage'
import { SearchResult } from './pages/SearchResult'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/books/:isbn13',
        element: <BookPage />
      },
      {
        path: '/favorite',
        element: <FavoritePage />
      },
      {
        path: '/basket',
        element: <BasketPage />
      },
      {
        path: '/search/:query',
        element: <SearchResult />
      }
    ]
  }
])
