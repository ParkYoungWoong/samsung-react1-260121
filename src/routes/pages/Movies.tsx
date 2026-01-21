import { useState } from 'react'
import { uniqBy } from 'lodash-es'
import { Link, Outlet } from 'react-router'
import TextField from '@/components/TextField'
import Button from '@/components/Button'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [searchText, setSearchText] = useState('')

  async function fetchMovies() {
    if (!searchText.trim()) return
    const res = await fetch(
      `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
    )
    const json = await res.json()
    const movies = uniqBy(json.Search as Movie[], 'imdbID') // 배열 데이터! 최대 10개 영화 정보!
    setMovies(movies)
  }

  return (
    <>
      <div>
        <TextField
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') fetchMovies()
          }}
        />
        <Button onClick={fetchMovies}>검색</Button>
      </div>
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
