import { Navigate, Outlet } from 'react-router-dom'

const ProtectedAuthRoute = ({ authorized }) => {
  return authorized ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedAuthRoute
