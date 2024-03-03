import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { MainPage } from './pages/MainPage'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      }
    ]
  }
])
