import { createBrowserRouter, RouterProvider } from 'react-router'
import Default from './layouts/Default'
// import Home from './pages/Home'
// import About from './pages/About'
// import Movies from './pages/Movies'
// import MovieDetails from './pages/MovieDetails'
// import NotFound from './pages/NotFound'
// import SignIn from './pages/SignIn'
import { requiresAuth } from './loaders/requiresAuth'
import { guessOnly } from './loaders/guessOnly'
import { dynamic } from './dynamic'

const Home = dynamic(() => import('./pages/Home'))
const About = dynamic(() => import('./pages/About'))
const Movies = dynamic(() => import('./pages/Movies'))
const MovieDetails = dynamic(() => import('./pages/MovieDetails'))
const NotFound = dynamic(() => import('./pages/NotFound'))
const SignIn = dynamic(() => import('./pages/SignIn'))

const router = createBrowserRouter([
  // 라우트 객체
  {
    element: <Default />,
    children: [
      {
        path: '/', // http://localhost:5173/
        // element: <Home />
        Component: Home
      },
      {
        path: '/about', // http://localhost:5173/about
        Component: About
      },
      {
        path: '/movies',
        Component: Movies,
        loader: requiresAuth,
        children: [
          {
            path: '/movies/:movieId',
            Component: MovieDetails
          }
        ]
      },
      {
        loader: guessOnly,
        path: '/signin',
        Component: SignIn
      }
    ]
  },
  {
    path: '*',
    Component: NotFound
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
