import { create } from 'zustand'

export const useMovieStore = create((set, get) => {
  return {
    searchText: '',
    movies: [],
    setSearchText: (text: string) => {
      set({
        searchText: text
      })
    },
    async fetchMovies() {
      const { searchText } = get()
      if (!searchText.trim()) return
      const res = await fetch(
        `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
      )
      const json = await res.json()
      const movies = uniqBy(json.Search as Movie[], 'imdbID') // 배열 데이터! 최대 10개 영화 정보!
      setMovies(movies)
    }
  }
})
