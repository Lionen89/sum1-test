import React from 'react'
import './Header.scss'
import Links from '../Links/Links'
import useUsers from '../../utils/hooks/useUsers'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  const { currentUser } = useUsers()

  return (
    <header className="header">
      <Links />
      {currentUser && (
        <Link to="/profile" className="header__text">
          <p className="header__text header__email">{currentUser}</p>
        </Link>
      )}
    </header>
  )
}
export default Header
