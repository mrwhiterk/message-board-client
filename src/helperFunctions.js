
export const passwordFieldsMatch = (f1, f2) => f1 === f2

export const saveToLocalStorage = (token) => {
  localStorage.setItem('token', token)
}