import { useState } from 'react'
import TextField from '@/components/TextField'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(email, password)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          max={10}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <TextField />
        <button type="submit">제출</button>
      </form>
    </>
  )
}
