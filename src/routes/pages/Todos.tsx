import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { requestTodos } from '@/stores/todo'
import type { Todo } from '@/stores/todo'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import TodoItem from '@/components/TodoItem'
import Loader from '@/components/Loader'

const kdt = 'KDT8_'
const apikey = 'bcAWVpD8'
const message = `headers: {
  'content-type': 'application/json',
  apikey: '${kdt}${apikey}',
  username: '${kdt}ParkYoungWoong'
}`

export default function Todos() {
  const [title, setTitle] = useState('')
  const queryClient = useQueryClient()
  const { data: todos } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await requestTodos('/', { method: 'GET' })
      return res.json()
    },
    staleTime: 1000 * 60 * 5
  })
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (title: string) => {
      const res = await requestTodos('/', {
        method: 'POST',
        body: JSON.stringify({ title })
      })
      return res.json()
    },
    onMutate: title => {
      // 캐시된 기존 목록(원본)을 가져옵니다.
      const todos = queryClient.getQueryData<Todo[]>(['todos'])
      if (!todos) return
      // title을 제외하고 모두 가짜(임시) 데이터입니다.
      const newTodo = {
        id: Math.random().toString(),
        title,
        done: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      // 캐시된 기존 목록을 새로운 가짜 데이터를 포함해서 낙관적으로 업데이트합니다.
      queryClient.setQueryData(['todos'], [newTodo, ...todos])
      // 여기에서 반환한 데이터는 onError의 3번째 매개변수로 전달됩니다.
      return todos
    },
    onSuccess: () => {
      // 낙관적으로 업데이트한 가짜 데이터 대신, 진짜 데이터를 가지고 있는 목록을 가져오기 위해서 캐시된 목록을 무효화합니다.
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (_error, _title, todos) => {
      // onMutate에서 반환하는 원본 목록을 3번째 매개변수로 받아서, 목록을 복구하는 용도로 사용합니다.
      queryClient.setQueryData(['todos'], todos)
    },
    onSettled: () => {
      //
    }
  })

  function createTodo() {
    mutateAsync(title)
  }
  return (
    <>
      <div className="message">
        <p>
          <code>/src/stores/todo.ts</code> 파일을 찾아 열고 하단의{' '}
          <code>requestTodos</code> 함수 코드를 찾아서 아래에 작성된
          헤더(Headers) 정보를 추가해야 API 요청이 정상적으로 동작합니다!
        </p>
        <p>
          <code>username</code> 옵션의 값을 강사 이름이 아닌, <code>{kdt}</code>
          로 시작하고 자신의 이름(영어)으로 작성하면, 다른 사람과 자신의
          데이터가 중복되지 않습니다.
        </p>
        <p>
          그리고 자신의 이름으로 작성하면 처음에는 데이터가 없어서 빈 목록이
          표시됩니다. 그러면 데이터를 추가해보세요!
        </p>
        <p>
          테스트할 수 있는, 같은 API를 사용하는 예제 사이트 주소도 포함합니다.
        </p>
        <p>
          <a
            href="https://todo-app-two-black-25.vercel.app/"
            target="_blank">
            https://todo-app-two-black-25.vercel.app/
          </a>
        </p>
        <p>
          기타 궁금한 부분은 <code>thesecon@gmail.com</code>으로 연락주세요.
        </p>
        <pre>{message}</pre>
      </div>
      <TextField
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => {
          if (e.nativeEvent.isComposing) return // 한글 중복 입력 이슈를 방지합니다.
          if (e.key === 'Enter') createTodo()
        }}
      />
      <Button onClick={createTodo}>추가</Button>
      {isPending && <Loader />}
      <ul>
        {todos?.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </>
  )
}
