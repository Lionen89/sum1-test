import React from 'react'
import panda from '../../images/panda-account-main.svg'
import './profile.scss'
import { useNavigate } from 'react-router-dom'
import useUsers from '../../utils/hooks/useUsers'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../redux/slices/userSlice'
interface ProfileProps {
  setAuthorized: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfilePage: React.FC<ProfileProps> = ({ setAuthorized }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser } = useUsers()

  const handleLogout = (): void => {
    localStorage.setItem('isAuth', 'false')
    dispatch(setCurrentUser(''))
    setAuthorized(false)
    navigate('/')
  }

  return (
    <div className="profile">
      <div className="profile__container">
        <img src={panda} alt="Panda" />
        <div className="profile__info">
          <h3 className="profile__title">Привет!</h3>
          <span className="profile__text">{currentUser}</span>
        </div>
        <button className="profile__button" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </div>
  )
}

export default ProfilePage
