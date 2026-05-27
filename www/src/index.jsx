// Dependencies.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Routes.
import LoginPage from './routes/LoginPage.jsx'
import DashboardPage from './routes/DashboardPage.jsx'
import ProfilePage from './routes/ProfilePage.jsx'
import NotFoundPage from './routes/NotFoundPage.jsx'

// Main application.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to='/dashboard' replace />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/profile' element={<ProfilePage />}></Route>
        <Route path='/dashboard' element={<DashboardPage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
