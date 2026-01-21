import { redirect } from 'react-router'

export async function requiresAuth({ request }: { request: Request }) {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    const url = new URL(request.url) // 'http://localhost:5173/movies?a=1
    const callbackUrl = url.pathname + url.search // '/movies' + '?a=1' => '/movies?a=1'
    return redirect(`/signin?callbackUrl=${callbackUrl}`)
  }
  return true
}
