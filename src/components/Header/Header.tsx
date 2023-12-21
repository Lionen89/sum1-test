import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.scss'

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
        {headerData.map((item) => (
          <Link
            to={item.path}
            key={item.id}
            className={`header__text header__link ${location.pathname === item.path ? 'header__link_active' : ''}`}>
            {item.title}
          </Link>
        ))}
      </div>
      <p className="header__text header__email">{location.pathname === '/' ? '' : ''}dsdaadsad</p>
    </header>
  )
}
export default Header
