// import { create } from 'zustand'
// import { combine } from 'zustand/middleware'

export interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}

// export const useTodoStore = create(combine({}, (set, get) => ({})))

// Axios 라이브러리를 사용하면 훨씬 더 간단하게 사용자 정의를 할 수 있습니다.
// 강의 중에 Axios 라이브러리를 사용하지 않았기 때문에 직접 사용자 정의 함수를 만들었습니다.
// https://www.heropy.dev/p/QOWqjV#h3_%EC%82%AC%EC%9A%A9%EC%9E%90_%EC%A0%95%EC%9D%98_%EA%B5%AC%EC%84%B1
export async function requestTodos(url = '', options: RequestInit = {}) {
  return fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos${url}`,
    {
      ...options,
      headers: {
        'content-type': 'application/json',
        apikey: '값을_넣으세요',
        username: '값을_넣으세요',
        ...options.headers
      }
    }
  )
}
