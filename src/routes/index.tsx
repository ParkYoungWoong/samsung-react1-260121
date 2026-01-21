import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home'
import About from './pages/About'

const router = createBrowserRouter([
  {
    path: '/', // http://localhost:5173/
    element: <Home />
  }, // 라우트 객체
  {
    path: '/about', // http://localhost:5173/about
    element: <About />
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
