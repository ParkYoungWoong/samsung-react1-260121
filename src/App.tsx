import { useState } from 'react'
import Parent from '@/components/Parent'
import Child from '@/components/Child'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Parent
        abc={count}
        xyz={setCount}></Parent>
      <Child abc="Hello" />
      <Child abc="World" />
    </>
  )
}
