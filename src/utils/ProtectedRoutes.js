import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = ({ authorized }) => {
  return authorized ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes
