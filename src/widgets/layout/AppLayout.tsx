import { NavLink, Outlet } from 'react-router-dom'
import '@/widgets/layout/layout.scss'

const NAV_ITEMS = [
  { to: '/', label: 'Inicio' },
  { to: '/usuarios', label: 'Usuarios' },
  { to: '/perfis', label: 'Perfis' },
  { to: '/edificios', label: 'Edificios' },
  { to: '/salas', label: 'Salas' },
  { to: '/horarios', label: 'Horarios' },
  { to: '/cursos', label: 'Cursos' },
  { to: '/disciplinas', label: 'Disciplinas' },
  { to: '/reservas', label: 'Reservas' },
]

export function AppLayout() {
  return (
    <div className="app-layout">
      <nav className="app-sidebar">
        <h2 className="app-sidebar-title">Labtech Reservas</h2>
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.to === '/'}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}
