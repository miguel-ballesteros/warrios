import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './App.css'

import PlayerPage from './Pages/Players/PlayerPage'
const WarriorsPage = lazy(() => import('./Pages/warriors/WarriosPage'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/players" replace />} />
          <Route path="/players" element={<PlayerPage />} />
          <Route path="/warriors/player/:id" element={<WarriorsPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
