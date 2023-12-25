import React from 'react'
import { linksData } from '../../utils/constants/Constants'
import { Link, useLocation } from 'react-router-dom'
import './links.scss'

function Links() {
  const location = useLocation()

  return (
    <div className="links">
      {linksData.map((item) => (
        <Link
          to={item.path}
          key={item.id}
          className={`links__text links__item ${location.pathname === item.path ? 'links__item_active' : ''}`}>
          {item.title}
        </Link>
      ))}
    </div>
  )
}

export default Links
