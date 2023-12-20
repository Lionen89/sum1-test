import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header: React.FC = () => {
  const location = useLocation()
  const headerData = [
    { id: 1, path: '/', title: 'На главную' },
    { id: 2, path: '/login', title: 'Войти' },
    { id: 3, path: '/profile', title: 'Профиль' },
    { id: 4, path: '/registration', title: 'Регистрация' },
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
