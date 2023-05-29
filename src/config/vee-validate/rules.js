import { configure, defineRule } from 'vee-validate'

defineRule('required', (value) => {
  if (!value || !value.length) {
    return 'ველის შევსება აუცილებელია.'
  }
  return true
})
defineRule('email', (value) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(value)) {
    return 'შეიყვანეთ მეილი სწორად'
  }
  return true
})

defineRule('min', (value, length) => {
  if (value.length < length) {
    return `მინიმუმ ${length} სიმბოლო`
  }
  return true
})

defineRule('max', (value, length) => {
  if (value.length > length) {
    return `მაქსიმუმ ${length} სიმბოლო`
  }
  return true
})

defineRule('latin', (value) => {
  if (!value || !value.length) {
    return true
  }

  if (/^[a-z0-9]+$/.test(value)) {
    return true
  }
  return 'მხოლოდ დაბალი რეგისტრის ლათინური სიმბოლოები და რიცხვები.'
})

configure({
  validateOnInput: true,
  validateOnBlur: true,
  validateOnChange: true,
  validateOnModelUpdate: true
})
