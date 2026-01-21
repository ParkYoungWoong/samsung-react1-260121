// import type { ReactNode } from 'react'

export interface Props {
  abc: number
  xyz: (x: number) => void
  children: React.ReactNode
}

export default function Parent({ abc, xyz, children }: Props) {
  return (
    <>
      <h1 onClick={() => xyz(abc + 1)}>Parent ({abc})</h1>
      {children}
    </>
  )
}
