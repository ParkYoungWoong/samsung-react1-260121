import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { requestTodos } from '@/stores/todo'
import type { Todo } from '@/stores/todo'
import Button from '@/components/Button'

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [inputText, setInputText] = useState(todo.title)

  const queryClient = useQueryClient()
  const { mutateAsync: mutateAsyncForUpdate } = useMutation({
    mutationFn: async (todoToUpdate: Todo) => {
      const res = await requestTodos(`/${todoToUpdate.id}`, {
        method: 'PUT',
        body: JSON.stringify(todoToUpdate)
      })
      return res.json()
    },
    onMutate: todoToUpdate => {
      const todos = queryClient.getQueryData<Todo[]>(['todos'])
      if (!todos) return
      queryClient.setQueryData(
        ['todos'],
        todos.map(todo => (todo.id === todoToUpdate.id ? todoToUpdate : todo))
      )
      return todos
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (_error, _todoToUpdate, todos) => {
      queryClient.setQueryData(['todos'], todos)
    },
    onSettled: () => {
      //
    }
  })
  const { mutateAsync: mutateAsyncForDelete } = useMutation({
    mutationFn: async (todoToDelete: Todo) => {
      const res = await requestTodos(`/${todoToDelete.id}`, {
        method: 'DELETE'
      })
      return res.json()
    },
    onMutate: todoToDelete => {
      const todos = queryClient.getQueryData<Todo[]>(['todos'])
      if (!todos) return
      queryClient.setQueryData(
        ['todos'],
        todos.filter(todo => todo.id !== todoToDelete.id)
      )
      return todos
    },
    onSuccess: () => {
      //
    },
    onError: (_error, _todoToDelete, todos) => {
      queryClient.setQueryData(['todos'], todos)
    },
    onSettled: () => {
      //
    }
  })

  function onEditMode() {
    setIsEditMode(true)
  }
  function offEditMode() {
    setInputText(todo.title)
    setIsEditMode(false)
  }
  function updateTodo() {
    mutateAsyncForUpdate({ ...todo, title: inputText })
    offEditMode()
  }
  function deleteTodo() {
    mutateAsyncForDelete(todo)
    offEditMode()
  }

  return (
    <li>
      {isEditMode ? (
        <div>
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => {
              if (e.nativeEvent.isComposing) return // 한글 중복 입력 이슈를 방지합니다.
              if (e.key === 'Escape') offEditMode()
              if (e.key === 'Enter') updateTodo()
            }}
          />
          <Button onClick={offEditMode}>저장</Button>
          <Button onClick={offEditMode}>취소</Button>
          <Button onClick={deleteTodo}>삭제</Button>
        </div>
      ) : (
        <div>
          <span>{todo.title}</span>
          <Button onClick={onEditMode}>수정</Button>
        </div>
      )}
    </li>
  )
}
