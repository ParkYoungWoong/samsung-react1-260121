// interface Props extends React.요소이름HTMLAttributes<HTML요소이름Element> {
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function TextField({ label, ...restProps }: Props) {
  return (
    <label>
      {label && <span>{label}</span>}
      <input {...restProps} />
    </label>
  )
}
