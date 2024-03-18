import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { MainPage } from './pages/Main'
import { BookPage } from './pages/Book'
import { FavoritePage } from './pages/Favorite'
import { BasketPage } from './pages/Basket'
import { SearchResultPage } from './pages/SearchResult'

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
        path: '/search/:query/:page',
        element: <SearchResultPage />
      }
    ]
  }
])
