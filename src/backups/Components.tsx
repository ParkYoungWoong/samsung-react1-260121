import { useState } from 'react'
import TextField from '@/components/TextField'
import Button from '@/components/Button'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    console.log(email, password)
    await new Promise(resolve => {
      setTimeout(resolve, 3000)
    })
    setIsLoading(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <TextField />
        <Button
          type="submit"
          loading={isLoading}>
          제출
        </Button>
        <Button>
          <span>로딩</span>
        </Button>
      </form>
    </>
  )
}
