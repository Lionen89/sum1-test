import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header: React.FC = () => {
  const location = useLocation()
  const headerData = [
    { id: 0, path: '/', title: 'На главную' },
    { id: 1, path: '/login', title: 'Войти' },
    { id: 2, path: '/profile', title: 'Профиль' },
    { id: 3, path: '/registration', title: 'Регистрация' },
  ]
  return (
    <header className="header">
      <div className="header__links">
        <p className="header__text header__email">{location.pathname === '/' ? '' : ''}</p>
        {headerData.map((item) => (
          <Link to={item.path} key={item.id} className="header__text header__link">
            {item.title}
          </Link>
        ))}
      </div>
    </header>
  )
}
export default Header
