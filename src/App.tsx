import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

function HomePage() {
  return (
    <main>
      <h1>Reservas</h1>
      <p>Projeto inicial com React Router funcionando.</p>
      <Link to="/sobre">Ir para sobre</Link>
    </main>
  )
}

function AboutPage() {
  return (
    <main>
      <h1>Sobre</h1>
      <Link to="/">Voltar para home</Link>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sobre" element={<AboutPage />} />
    </Routes>
  )
}

export default App
