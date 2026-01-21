// https://localhost:5173/movies/tt1877830
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'

interface Movie {
  Title: string
  Poster: string
}

export default function MovieDetails() {
  const { movieId } = useParams() // tt1877830
  const [movie, setMovie] = useState<Movie | null>(null)

  // useEffect(실행할함수, 의존성배열)
  useEffect(() => {
    async function fetchMovieDetails() {
      const res = await fetch(
        `https://omdbapi.com?apikey=7035c60c&i=${movieId}`
      )
      const movie = await res.json()
      setMovie(movie)
    }
    fetchMovieDetails()
  }, [])

  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="content">
        {movie && (
          <>
            <h1>{movie.Title}</h1>
            <img
              src={movie.Poster}
              alt={movie.Title}
            />
          </>
        )}
      </div>
    </div>
  )
}
