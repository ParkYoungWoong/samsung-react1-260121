import TextField from '@/components/TextField'
import Button from '@/components/Button'
import { useNavigate } from 'react-router'

export default function SignIn() {
  const navigate = useNavigate()
  function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const id = formData.get('id')
    const pw = formData.get('pw')
    if (id && pw) {
      localStorage.setItem('accessToken', '12345678')
      navigate('/')
    }
  }
  return (
    <>
      <h1>로그인 페이지!</h1>
      <form onSubmit={signIn}>
        <TextField name="id" />
        <TextField name="pw" />
        <Button type="submit">로그인</Button>
      </form>
    </>
  )
}
