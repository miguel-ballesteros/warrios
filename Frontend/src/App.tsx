import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './App.css'

import PlayerPage from './Pages/Players/PlayerPage'
const WarriorsPage = lazy(() => import('./Pages/warriors/WarriosPage'))
const ProfilePage = lazy(() => import('./Pages/profile/ProfilePage'))
const LoobysPage = lazy(() => import('./Pages/Loobys/LoobysPage'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/players" replace />} />
          <Route path="/players" element={<PlayerPage />} />
          <Route path="/warriors/player/:id" element={<WarriorsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/loobys/:id" element={<LoobysPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
