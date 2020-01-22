import axios from './axiosConfig'
import jwt_decode from 'jwt-decode'
import setAuthJWT from './api/setAuthJWT'
import { removeToken } from './helperFunctions'

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
  const userData = jwt_decode(token)
  const currentTime = Date.now() / 1000

  if (userData.exp < currentTime) {
    removeToken()
    setAuthJWT(null)
    return false
  } else {
    setAuthJWT(token)
    return userData
  }
}

// test auth func
export const getSecret = async () => {
  try {
    let response = await axios.get('/users')

    return response
  } catch (err) {
    console.log(err);
  }
}
