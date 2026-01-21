import Header from '@/components/Header'
import { Outlet, ScrollRestoration } from 'react-router'

export default function Default() {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </>
  )
}
