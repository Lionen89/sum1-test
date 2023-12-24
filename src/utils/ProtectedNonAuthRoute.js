import { Navigate, Outlet } from 'react-router-dom'

const ProtectedNonAuthRoute = ({ authorized }) => {
  return !authorized ? <Outlet /> : <Navigate to="/profile" />
}

export default ProtectedNonAuthRoute
