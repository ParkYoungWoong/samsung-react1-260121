import { useParams, useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'

export default function MovieDetails() {
  const navigate = useNavigate()
  const { movieId } = useParams() // tt1877830
  const { data: movie } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: async () => {
      const res = await fetch(
        `https://omdbapi.com?apikey=7035c60c&i=${movieId}`
      )
      const movie = await res.json()
      return movie
    },
    staleTime: 1000 * 60 * 5
  })

  function offModal() {
    navigate('/movies')
  }

  return (
    <div className="modal">
      <div
        className="overlay"
        onClick={offModal}></div>
      <div className="content">
        <button onClick={offModal}>닫기</button>
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
