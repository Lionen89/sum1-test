import React from 'react'
import './Registration.scss'
import { Link } from 'react-router-dom'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { regexEmail, validationMessages } from '../../utils/constants/Constants'
import useEnterSubmit from '../../utils/hooks/useEnterSubmit'
import useUsers from '../../utils/hooks/useUsers'
import { Users } from '../../types/Users'

type RegistrationFormData = {
  name: string
  email: string
  password: string
  repeatPassword: string
}

const RegistrationPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>({ mode: 'all' })

  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false)
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [isSignupSucces, setSignupSucces] = React.useState<boolean>(false)

  const { users } = useUsers()

  function handlePasswordVisible(): void {
    setIsPasswordVisible(!isPasswordVisible)
  }
  function handleRepeatPasswordVisible(): void {
    setIsRepeatPasswordVisible(!isRepeatPasswordVisible)
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const matchingUser = users.find((user: Users) => user.email === data.email)
    if (matchingUser) {
      setErrorMessage('Пользователь с таким логином уже зарегистрирован')
    } else {
      setSignupSucces(true)
    }
  }

  useEnterSubmit({ handleSubmit: () => onSubmit({ email: watch('email'), password: watch('password') }) })

  return (
    <div className="registration">
      <div className="registration__container">
        {!isSignupSucces ? (
          <form
            className={`registration__form ${errors.email && errors.password ? 'registration__form_errors' : ''}`}
            name="registration-form"
            onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && <span className="registration__error registration__error_top">{errorMessage}</span>}

            <div className="registration__input-container">
              <input
                {...register('name', {
                  required: 'Пожалуйста, введите Имя',
                  minLength: {
                    value: 2,
                    message: 'Имя должно содержать минимум 2 символа',
                  },
                  maxLength: { value: 150, message: 'Имя должно содержать максимум 150 символов' },
                })}
                type="text"
                className={`registration__input ${errors.name ? 'registration__input_error' : ''}`}
                placeholder="Имя"
              />
              {errors.name ? (
                <span className="registration__error">
                  {typeof errors.name === 'string' ? errors.name : (errors.name?.message as string)}
                </span>
              ) : (
                ''
              )}
            </div>
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
                    value: 6,
                    message: 'Пароль должен содержать минимум 6 символов',
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
                  {typeof errors.repeatPassword === 'string'
                    ? errors.repeatPassword
                    : (errors.repeatPassword.message as string)}
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
              disabled={
                !watch('email') || !watch('password') || !watch('repeatPassword') || Object.entries(errors).length !== 0
              }>
              Зарегистрироваться
            </button>
          </form>
        ) : (
          <>
            <p className="registration__succes">
              Регистрация прошла успешно, <br />
              пожалуйста, войдите на сайт
            </p>
            <Link to={'/login'} className="registration__save-button registration__link">
              Войти
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default RegistrationPage
