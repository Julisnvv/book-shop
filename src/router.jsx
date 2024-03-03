import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { MainPage } from './pages/MainPage'
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
