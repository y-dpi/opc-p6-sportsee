// Dependencies.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Layouts.
import MainLayout from './layouts/MainLayout.jsx'

// Components.
import RequireAuth from './components/RequireAuth.jsx'

// Context.
import { UserInfoProvider } from './context/UserInfoProvider.jsx'

// Routes.
import LoginPage from './routes/LoginPage.jsx'
import DashboardPage from './routes/DashboardPage.jsx'
import ProfilePage from './routes/ProfilePage.jsx'
import NotFoundPage from './routes/NotFoundPage.jsx'

// Main application.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserInfoProvider>
        <Routes>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route element={<RequireAuth />}>
          <Route index element={<Navigate to='/dashboard' replace />}></Route>
          <Route element={<MainLayout />}>
            <Route path='/dashboard' element={<DashboardPage />}></Route>
            <Route path='/profile' element={<ProfilePage />}></Route>
          </Route>
        </Route>
        <Route element={<MainLayout />}>
            <Route path='*' element={<NotFoundPage />}></Route>
          </Route>
        </Routes>
      </UserInfoProvider>
    </BrowserRouter>
  </StrictMode>,
)
