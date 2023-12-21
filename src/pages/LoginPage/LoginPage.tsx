import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { regexEmail, validationMessages } from '../../utils/constantns/Constants'
import './Login.scss'

const LoginPage: React.FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' })

  const navigate = useNavigate()

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

  function handlePasswordVisible() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  function onSubmit(data: any) {
    // Обработка логики входа { ...data, needRememberUser: isCheckboxActive }, false)
  }

  return (
    <div className="login">
      <div className="login__container">
        <form
          className={`login__form ${errors.email && errors.password ? 'login__form_errors' : ''}`}
          name="login-form"
          onSubmit={handleSubmit(onSubmit)}>
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
            />
          </div>
          {errors.email && (
            <span className="login__error">
              {typeof errors.email === 'string' ? errors.email : (errors.email.message as string)}
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
            />
            {errors.password && (
              <span className="login__error">
                {typeof errors.password === 'string' ? errors.password : (errors.password.message as string)}
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
