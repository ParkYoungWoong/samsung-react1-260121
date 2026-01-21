import { useCountStore } from '@/stores/count'

export default function About() {
  const count = useCountStore(s => s.count)
  const double = useCountStore(s => s.double)
  const increase = useCountStore(s => s.increase)
  return (
    <>
      <h1 onClick={increase}>About Page!</h1>
      <h2>Count: {count}</h2>
      <h2>Double: {double}</h2>
    </>
  )
}
