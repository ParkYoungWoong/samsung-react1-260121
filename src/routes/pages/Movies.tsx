import { useEffect, Fragment, useState } from 'react'
import { Link, Outlet } from 'react-router'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import { useMovieStore } from '@/stores/movie'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

interface Page {
  Response: 'True' | 'False'
  Search?: Movie[]
  totalResults?: string
  Error?: string
}
interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies() {
  const [inputText, setInputText] = useState('')
  const searchText = useMovieStore(s => s.searchText)
  const setSearchText = useMovieStore(s => s.setSearchText)
  const [ref, inView] = useInView()

  const {
    data, // 가져온 데이터
    isFetching, // 다음 페이지 가져오는 중
    hasNextPage, // 다음 페이지가 있는지 여부
    fetchNextPage // 다음 페이지 가져오기 함수
  } = useInfiniteQuery<Page>({
    queryKey: ['movies', searchText], // 검색어로 쿼리 키 생성!,
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${searchText}&page=${pageParam}`
      )
      return res.json()
    },
    initialPageParam: 1, // 첫 페이지 번호 초기화!
    getNextPageParam: (lastPage, allPages) => {
      // 한 페이지당 최대 10개까지 영화 정보를 가져옴!
      // 마지막 페이지 번호 계산!
      const lastPageParam = Math.ceil(Number(lastPage.totalResults) / 10)
      // 다음 페이지가 있으면 다음 페이지 번호 반환, 없으면 null 반환
      return allPages.length < lastPageParam ? allPages.length + 1 : null
    },
    enabled: Boolean(searchText), // 검색어 입력 전까지 대기!
    placeholderData: prev => prev
  })

  useEffect(() => {
    if (inView) fetchNextPage()
    // eslint-disable-next-line
  }, [inView])

  function fetchMovies() {
    setSearchText(inputText)
  }

  return (
    <>
      <div>
        <TextField
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') fetchMovies()
          }}
        />
        <Button onClick={fetchMovies}>검색</Button>
      </div>
      <ul>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            <li>------------- {index + 1} -------------</li>
            {page.Search?.map(movie => (
              <li key={movie.imdbID}>
                <Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
      <div
        ref={ref}
        style={{
          display: isFetching || !searchText || !hasNextPage ? 'none' : 'block'
        }}>
        Observer!
      </div>
      <Outlet />
    </>
  )
}
