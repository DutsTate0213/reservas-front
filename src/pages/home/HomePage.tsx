import { Link } from 'react-router-dom'

const LINKS = [
  { to: '/usuarios', label: 'Usuarios' },
  { to: '/perfis', label: 'Perfis' },
  { to: '/edificios', label: 'Edificios' },
  { to: '/salas', label: 'Salas' },
  { to: '/horarios', label: 'Horarios' },
  { to: '/cursos', label: 'Cursos' },
  { to: '/disciplinas', label: 'Disciplinas' },
  { to: '/reservas', label: 'Reservas' },
]

export function HomePage() {
  return (
    <section>
      <h1>Labtech Reservas</h1>
      <p>Interface de administracao para o CRUD do back-end. Escolha uma entidade:</p>
      <ul>
        {LINKS.map((link) => (
          <li key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
