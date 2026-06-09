// Dependencies.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Layouts.
import MainLayout from './layouts/MainLayout.jsx'

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
        <Route element={<MainLayout />}>
          <Route path='/dashboard' element={<DashboardPage />}></Route>
          <Route path='/profile' element={<ProfilePage />}></Route>
          <Route path='*' element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
