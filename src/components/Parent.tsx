export default function Parent({
  abc,
  xyz,
  children
}: {
  abc: number
  xyz: (x: number) => void
}) {
  return (
    <>
      <h1 onClick={() => xyz(abc + 1)}>Parent ({abc})</h1>
    </>
  )
}
