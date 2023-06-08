import { configure, defineRule } from 'vee-validate'
import { required, email, min, max, confirmed } from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('confirmed', confirmed)

defineRule('latin', (value) => {
  if (!value || !value.length) {
    return true
  }

  if (/^[a-z0-9]+$/.test(value)) {
    return true
  }
  return false
})

configure({
  validateOnInput: true,
  validateOnBlur: true,
  validateOnChange: true,
  validateOnModelUpdate: true
})
