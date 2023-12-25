import React from 'react'
import './Footer.scss'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <a target="_blank" href="https://t.me/Lionen" rel="noreferrer" className="footer__link">
        <p className="footer__copiright">&#169; Илья Трубицин</p>
      </a>
    </footer>
  )
}

export default Footer
