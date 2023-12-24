import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../redux/slices/userSlice'

const useUsers = () => {
  const dispatch = useDispatch()
  const { error, users, currentUser, loading } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return {
    users,
    currentUser,
    isError: error,
    isLoading: loading,
  }
}

export default useUsers
