export const usernameValidation = (value: string): boolean | string => {
  if (value === '' || value == null) return 'Username is required'
  if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(value)) {
    return 'It should start with an alphabet, should contain "_", no space allowed'
  }
  if (value?.length < 5) return 'Username must be at least 5 characters long'
  return true
}
export const subnameValidation = (value: string): boolean | string => {
  if (value === '' || value == null) return 'Name is required'
  if (!/^[A-Z][A-Za-z0-9_]*$/.test(value)) {
    return 'Start with an uppercase alphabet, no space, no special character allowed'
  }
  if (value?.length < 5) return 'Name must be at least 5 characters long'
  if (value?.length > 20) return 'Name must be at most 20 characters long'
  return true
}
export const passwordValidation = (value: string): boolean | string => {
  if (value == '') return 'Password is required'
  if (value?.length < 3) return 'Password must be at least 3 characters long'
  return true
}
export const rePasswordValidation = (value: string, password: string): boolean | string => {
  if (value == '') return 'You need to re-type your password'
  if (value !== password) return `Your passwords doesn't match`
  return true
}
export const emailValidation = (value: string): boolean | string => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  if (value === '' || value === 'N/A') return true
  if (!emailRegex.test(value)) return 'Invalid email address'
  return true
}
export const urlValidation = (value: string): boolean | string => {
  const urlRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i
  if (value === '' || value === 'N/A') return true
  if (!urlRegex.test(value)) return 'Invalid URL'
  return true
}
export const fullNameValidation = (value: string, length: number = 16): boolean | string => {
  const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/
  if (value === '') return 'Can not be empty'
  if (value?.length > length) return 'Sorry, too long'
  if (!nameRegex.test(value)) return 'No special character allowed'
  return true
}
export const textValidation = (value: string, length: number = 30): boolean | string => {
  const nameRegex = /^\S[\s\S]*\S$/
  if (value === '') return 'Can not be empty'
  if (value?.length > length) return 'Sorry, too long'
  if (!nameRegex.test(value)) return 'First and end character must not be space'
  return true
}
export const postTitleValidation = (value: string): boolean | string => {
  if (value === '' || value == null) return 'Title is required'
  if (value.length < 10) return 'Title must be at least 10 characters long'
  if (value.length > 100) return 'Title must not exceed 100 characters'
  return true
}
