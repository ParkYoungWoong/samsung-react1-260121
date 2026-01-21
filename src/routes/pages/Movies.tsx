import { useState, useEffect } from 'react'
import { uniqBy } from 'lodash-es'
import { Link, Outlet } from 'react-router'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([])

  // useEffect(실행할함수, 의존성배열)
  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch('https://omdbapi.com?apikey=7035c60c&s=batman')
      const json = await res.json()
      const movies = uniqBy(json.Search as Movie[], 'imdbID') // 배열 데이터! 최대 10개 영화 정보!
      setMovies(movies)
    }
    fetchMovies()
  }, [])

  return (
    <>
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.imdbID}>
              <Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
            </li>
          )
        })}
      </ul>
      <Outlet />
    </>
  )
}
