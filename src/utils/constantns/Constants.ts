type RegexType = RegExp

type ValidationMessages = {
  email: string
  phone: string
  firstName: string
  lastName: string
}

const regexEmail: RegexType =
  /^(([^<>()[\]\\.,;:*'#$~`+=?&%№!\s@"]+(\.[^<>()[\]\\.,;:*'#$~`+=?&%№!\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const regexTel: RegexType = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,15}(\s*)?$/
const regexName: RegexType = /^([a-zа-яё]+)$/i

const validationMessages: ValidationMessages = {
  email: 'E-mail должен соответствовать формату name@domain.ru',
  phone: 'Пожалуйста, введите валидный телефонный номер',
  firstName: 'Имя не должно содержать пробел, спецсимволы и цифры',
  lastName: 'Фамилия не должна содержать пробел, спецсимволы и цифры',
}

export { regexEmail, regexTel, regexName, validationMessages }
