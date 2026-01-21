import Loader from '@/components/Loader'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  loading?: boolean
}

export default function Button({ children, loading, ...restProps }: Props) {
  return <button {...restProps}>{loading ? <Loader /> : children}</button>
}
