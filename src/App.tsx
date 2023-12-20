import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Layout from './components/Layout/Layout'

const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route element={<ProtectedRoutes authorized={false} />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
