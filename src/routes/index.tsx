import { createBrowserRouter, RouterProvider } from 'react-router'
import Default from './layouts/Default'
import Home from './pages/Home'
import About from './pages/About'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'
import SignIn from './pages/SignIn'
import { requiresAuth } from './loaders/requiresAuth'

// http://localhost:5173/wkshdjbfksjdf

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
        element: <Movies />,
        loader: requiresAuth,
        children: [
          {
            path: '/movies/:movieId',
            element: <MovieDetails />
          }
        ]
      },
      {
        path: '/signin',
        element: <SignIn />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
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
