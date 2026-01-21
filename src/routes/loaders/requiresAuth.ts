import { redirect } from 'react-router'

export async function requiresAuth() {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    return redirect('/signin')
  }
  return true
}
