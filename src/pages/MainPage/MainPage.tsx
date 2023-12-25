import React from 'react'
import './main.scss'
import Links from '../../components/Links/Links'

const MainPage: React.FC = () => {
  return (
    <div className="main">
      <h1 className="main__title">Приветсвую тебя, дорогой ревьюер</h1>
      <p className="main__text">переходи по ссылкам и насладись магией react-router</p>
      <Links />
    </div>
  )
}

export default MainPage
