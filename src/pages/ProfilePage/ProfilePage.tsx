import React from 'react'
import panda from '../../images/panda-account-main.svg'
import './profile.scss'
import { useNavigate } from 'react-router-dom'
import useUsers from '../../utils/hooks/useUsers'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../redux/slices/userSlice'
interface ProfileProps {
  setAuthorized: Function
}

const ProfilePage: React.FC<ProfileProps> = ({ setAuthorized }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser } = useUsers()

  const handleLogout = (): void => {
    localStorage.clear()
    dispatch(setCurrentUser(''))
    setAuthorized(false)
    navigate('/')
  }

  return (
    <div className="profile">
      <div className="profile__container">
        <img src={panda} alt="Panda" />
        <div className="profile__info">
          <span className="profile__text">Your email:</span>
          <span className="profile__text profile__text_email">{currentUser}</span>
        </div>
        <button className="profile__button" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </div>
  )
}

export default ProfilePage
