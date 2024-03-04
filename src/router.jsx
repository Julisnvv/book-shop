import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { MainPage } from './pages/MainPage'
import { BooksPage } from './pages/BooksPage'
import { BookPage } from './pages/BookPage'
import { FavoritePage } from './pages/FavoritePage'
import { BasketPage } from './pages/BasketPage'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/books',
        element: <BooksPage />
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
      }
    ]
  }
])
