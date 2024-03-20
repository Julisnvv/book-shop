import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { useTitle } from './hooks/useTitle'
import { store } from './redux/store'
import { router } from './router'

export function App (): JSX.Element {
  // Hooks
  useTitle('BOOKSTORE')

  // Template
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
