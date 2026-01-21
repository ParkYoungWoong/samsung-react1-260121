import { Link, Outlet } from 'react-router'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import { useMovieStore } from '@/stores/movie'
// import { useQuery } from '@tanstack/react-query'

export default function Movies() {
  const searchText = useMovieStore(s => s.searchText)
  const setSearchText = useMovieStore(s => s.setSearchText)
  const movies = useMovieStore(s => s.movies)
  const fetchMovies = useMovieStore(s => s.fetchMovies)

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
