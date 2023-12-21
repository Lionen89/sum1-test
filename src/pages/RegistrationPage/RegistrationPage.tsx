import React from 'react'
import './Registration.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// import useEnterSubmit from '../utils/useEnterSubmit'
import { regexEmail, validationMessages } from '../../utils/constantns/Constants'

const RegistrationPage: React.FC<any> = ({ handleRegistration }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' })

  const navigate = useNavigate()

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = React.useState(false)

  function handlePasswordVisible() {
    setIsPasswordVisible(!isPasswordVisible)
  }
  function handleRepeatPasswordVisible() {
    setIsRepeatPasswordVisible(!isRepeatPasswordVisible)
  }
  // настройка, чтобы при нажатии Enter работал сабмит формы
  // useEnterSubmit(handleSubmit, handleRegistration)

  return (
    <div className="registration">
      <div className="registration__container">
        <form
          className={`registration__form ${errors.email && errors.password ? 'registration__form_errors' : ''}`}
          name="registration-form"
          onSubmit={handleSubmit(handleRegistration)}>
          <div className="registration__input-container">
            <input
              {...register('email', {
                required: 'Пожалуйста, введите email',
                pattern: {
                  value: regexEmail,
                  message: validationMessages.email,
                },
                maxLength: { value: 100, message: 'email должен содержать максимум 100 символов' },
              })}
              type="email"
              className={`registration__input ${errors.email ? 'registration__input_error' : ''}`}
              placeholder="Email"
            />
            {errors.email ? (
              <span className="registration__error">
                {typeof errors.email === 'string' ? errors.email : (errors.email.message as string)}
              </span>
            ) : (
              ''
            )}
          </div>
          <div className="registration__input-container">
            <input
              {...register('password', {
                required: 'Пожалуйста, введите пароль',
                minLength: {
                  value: 8,
                  message: 'Пароль должен содержать минимум 8 символов',
                },
              })}
              type={`${!isPasswordVisible ? 'password' : 'text'}`}
              className={`registration__input ${errors.password ? 'registration__input_error' : ''}`}
              placeholder="Пароль"
            />
            {errors.password ? (
              <span className="registration__error">
                {typeof errors.password === 'string' ? errors.password : (errors.password.message as string)}
              </span>
            ) : (
              ''
            )}
            <button
              className={`registration__eye ${isPasswordVisible ? 'registration__eye_close' : ''}`}
              type="button"
              onClick={handlePasswordVisible}></button>
          </div>
          <div className="registration__input-container">
            <input
              {...register('repeatPassword', {
                required: 'Пожалуйста, введите пароль еще раз',
                validate: (value) => value === watch('password') || 'Введённый пароль не совпадает',
              })}
              type={`${!isRepeatPasswordVisible ? 'password' : 'text'}`}
              className={`registration__input ${errors.repeatPassword ? 'registration__input_error' : ''}`}
              placeholder="Повторный пароль"
            />
            {errors.repeatPassword ? (
              <span className="registration__error">
                {typeof errors.password === 'string' ? errors.password : (errors.repeatPassword.message as string)}
              </span>
            ) : (
              ''
            )}
            <button
              className={`registration__eye ${isRepeatPasswordVisible ? 'registration__eye_close' : ''}`}
              type="button"
              onClick={handleRepeatPasswordVisible}></button>
          </div>

          <button
            type="submit"
            className="registration__save-button"
            onClick={handleSubmit(handleRegistration)}
            disabled={
              !watch('email') || !watch('password') || !watch('repeatPassword') || Object.entries(errors).length !== 0
            }>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegistrationPage
