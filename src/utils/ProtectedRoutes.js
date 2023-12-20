import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = ({ authorized }) => {
  return authorized ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes
