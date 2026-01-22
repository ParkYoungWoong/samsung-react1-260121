import TextField from '@/components/TextField'
import Button from '@/components/Button'
import { useNavigate, useSearchParams } from 'react-router'

export default function SignIn() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const id = formData.get('id')
    const pw = formData.get('pw')
    if (id && pw) {
      localStorage.setItem('accessToken', '12345678')
      navigate(callbackUrl || '/')
    }
  }
  return (
    <>
      <h1>로그인 페이지!</h1>
      <form onSubmit={signIn}>
        <TextField
          name="id"
          value="abcd"
        />
        <TextField
          name="pw"
          value="1234"
        />
        <Button type="submit">로그인</Button>
      </form>
    </>
  )
}
