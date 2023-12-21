import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './layout.scss'

const Layout: React.FC = function () {
  return (
    <div className="layout">
      <Header />
      <div className="layout__container">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
export default Layout
