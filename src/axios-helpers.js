import axios from './axiosConfig'
import jwt_decode from 'jwt-decode'
import setAuthJWT from './api/setAuthJWT'

export const signup = async formBody => {
  try {
    let response = await axios.post('/users/signup', formBody)

    return response
  } catch (err) {
    return err.response
  }
}

export const signin = async formBody => {
  try {
    let response = await axios.post('/users/signin', formBody)

    return response
  } catch (err) {
    return err.response
  }
}

export const checkToken = () => {
  const token = localStorage.getItem('token')

  if (!token) {
    return false
  }

  const decoded = jwt_decode(token)
  const currentTime = Date.now() / 1000

  if (decoded.exp < currentTime) {
    localStorage.removeItem('token')
    setAuthJWT(null)

    return false
  } else {
    setAuthJWT(token)

    return decoded
  }
}

export const getSecret = async () => {
  try {
    let response = await axios.get('/users')

    return response
  } catch (err) {
    console.log('cant hit', err)
  }
}
