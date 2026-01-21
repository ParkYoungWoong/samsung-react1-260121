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
