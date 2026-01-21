import { redirect } from 'react-router'

export async function guessOnly() {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    return redirect('/')
  }
  return true
}
