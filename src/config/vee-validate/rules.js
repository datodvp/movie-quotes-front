import { configure, defineRule } from 'vee-validate'

defineRule('required', (value) => {
  if (!value || !value.length) {
    return 'Field is required!'
  }
  return true
})
defineRule('email', (value) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(value)) {
    return 'Email must be in correct format!'
  }
  return true
})

defineRule('min', (value, length) => {
  if (value.length < length) {
    return `minimum ${length} characters`
  }
  return true
})

defineRule('max', (value, length) => {
  if (value.length > length) {
    return `maximum ${length} characters`
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
  return 'Lower latin characters and numbers.'
})

defineRule('confirmed', (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true
  }
  return 'Password must be same'
})

configure({
  validateOnInput: true,
  validateOnBlur: true,
  validateOnChange: true,
  validateOnModelUpdate: true
})
