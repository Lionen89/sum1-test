import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { regexEmail, validationMessages } from '../../utils/constants/Constants'
import './Login.scss'
import useEnterSubmit from '../../utils/hooks/useEnterSubmit'
import { setCurrentUser } from '../../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import useUsers from '../../utils/hooks/useUsers'
interface LoginProps {
  setAuthorized: React.Dispatch<React.SetStateAction<boolean>>
}
interface LoginFormValues {
  email: string
  password: string
}

const LoginPage: React.FC<LoginProps> = ({ setAuthorized }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { users } = useUsers()

  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  function handlePasswordVisible(): void {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const matchingUser = users.find(
      (user: LoginFormValues) => user.email === data.email && user.password === data.password
    )
    if (matchingUser) {
      navigate('/profile')
      setAuthorized(true)
      dispatch(setCurrentUser(data.email))
      localStorage.setItem('email', `${data.email}`)
      localStorage.setItem('isAuth', 'true')
    } else {
      setErrorMessage('Имя пользователя или пароль введены не верно')
    }
  }
  useEnterSubmit({ handleSubmit: () => onSubmit({ email: watch('email'), password: watch('password') }) })

  return (
    <div className="login">
      <div className="login__container">
        <form
          className={`login__form ${errors.email && errors.password ? 'login__form_errors' : ''}`}
          name="login-form"
          onSubmit={handleSubmit(onSubmit)}>
          {errorMessage && <span className="login__error">{errorMessage}</span>}
          <div className="login__input-container">
            <input
              {...register('email', {
                required: 'Пожалуйста, введите email',
                pattern: {
                  value: regexEmail,
                  message: validationMessages.email,
                },
              })}
              type="email"
              className={`login__input ${errors.email ? 'login__input_error' : ''}`}
              placeholder="Email"
              autoComplete="current-email"
              onFocus={() => setErrorMessage('')}
            />
          </div>
          {errors.email && (
            <span className="login__error">
              {typeof errors.email === 'string' ? errors.email : (errors.email?.message as string)}
            </span>
          )}
          <div className="login__input-container">
            <input
              {...register('password', {
                required: 'Пожалуйста, введите пароль',
                minLength: {
                  value: 6,
                  message: 'Пароль должен содержать минимум 6 символов',
                },
              })}
              type={`${!isPasswordVisible ? 'password' : 'text'}`}
              className={`login__input ${errors.password ? 'login__input_error' : ''}`}
              placeholder="Пароль"
              autoComplete="current-password"
              onFocus={() => setErrorMessage('')}
            />
            {errors.password && (
              <span className="login__error">
                {typeof errors.password === 'string' ? errors.password : (errors.password?.message as string)}
              </span>
            )}
            <button
              className={`login__eye ${isPasswordVisible ? 'login__eye_close' : ''}`}
              type="button"
              onClick={handlePasswordVisible}></button>
          </div>
          <button
            type="submit"
            className="login__save-button"
            disabled={!watch('email') || !watch('password') || Object.entries(errors).length !== 0}>
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
