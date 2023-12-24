import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import Layout from './components/Layout/Layout'
import ProtectedAuthRoute from './utils/ProtectedAuthRoute'
import ProtectedNonAuthRoute from './utils/ProtectedNonAuthRoute'
import { Provider } from 'react-redux'
import store from './redux/store'

const App: React.FC = () => {
  const [authorized, setAuthorized] = React.useState<boolean>(
    localStorage.getItem('isAuth') ? Boolean(localStorage.getItem('isAuth')) : false
  )

  return (
    <div className="app">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route element={<ProtectedNonAuthRoute authorized={authorized} />}>
              <Route path="login" element={<LoginPage setAuthorized={setAuthorized} />} />
              <Route path="registration" element={<RegistrationPage />} />
            </Route>
            <Route element={<ProtectedAuthRoute authorized={authorized} />}>
              <Route path="profile" element={<ProfilePage setAuthorized={setAuthorized} />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </div>
  )
}

export default App
