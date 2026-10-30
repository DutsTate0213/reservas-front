import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/widgets/layout/AppLayout'
import { HomePage } from '@/pages/home/HomePage'
import { UsuarioPage } from '@/pages/usuario/UsuarioPage'
import { PerfilPage } from '@/pages/perfil/PerfilPage'
import { EdificioPage } from '@/pages/edificio/EdificioPage'
import { SalaPage } from '@/pages/sala/SalaPage'
import { HorarioPage } from '@/pages/horario/HorarioPage'
import { CursoPage } from '@/pages/curso/CursoPage'
import { DisciplinaPage } from '@/pages/disciplina/DisciplinaPage'
import { ReservaPage } from '@/pages/reserva/ReservaPage'
import '@/shared/ui/ui.scss'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/usuarios" element={<UsuarioPage />} />
        <Route path="/perfis" element={<PerfilPage />} />
        <Route path="/edificios" element={<EdificioPage />} />
        <Route path="/salas" element={<SalaPage />} />
        <Route path="/horarios" element={<HorarioPage />} />
        <Route path="/cursos" element={<CursoPage />} />
        <Route path="/disciplinas" element={<DisciplinaPage />} />
        <Route path="/reservas" element={<ReservaPage />} />
      </Route>
    </Routes>
  )
}

export default App
