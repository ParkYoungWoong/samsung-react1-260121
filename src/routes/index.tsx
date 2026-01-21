import { createBrowserRouter, RouterProvider } from 'react-router'
import Default from './layouts/Default'
import Home from './pages/Home'
import About from './pages/About'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'

const router = createBrowserRouter([
  // 라우트 객체
  {
    element: <Default />,
    children: [
      {
        path: '/', // http://localhost:5173/
        element: <Home />
      },
      {
        path: '/about', // http://localhost:5173/about
        element: <About />
      },
      {
        path: '/movies',
        element: <Movies />
      },
      {
        path: '/movies/:movieId',
        element: <MovieDetails />
      }
    ]
  }
  // {
  //   element: <NewLayout />,
  //   children: [
  //     {
  //       path: '/signin', // http://localhost:5173/signin
  //       element: <SignIn />
  //     }
  //   ]
  // }
])

export default function Router() {
  return <RouterProvider router={router} />
}
