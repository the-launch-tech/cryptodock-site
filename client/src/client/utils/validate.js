export default {
  text: value => value.length > 1,
  email: value => value.length > 3 && value.includes('@') && value.includes('.'),
  password: value => value.length > 8,
  password_confirm: (value, newData) => value === newData.password.value,
}
