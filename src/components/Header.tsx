import { NavLink, useNavigate } from 'react-router'

export default function Header() {
  const navigate = useNavigate()
  return (
    <header>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/movies">Movies</NavLink>
      <NavLink to="/signin">Sign In</NavLink>
      <NavLink to="/todos">Todos</NavLink>
      <div
        onClick={() => {
          navigate('/signin')
        }}>
        박영웅
      </div>
    </header>
  )
}
