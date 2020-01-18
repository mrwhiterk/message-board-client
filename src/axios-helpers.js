import axios from './axiosConfig'

export const signup = async formBody => {
  try {
    let response = await axios.post('/users/signup', formBody)

    return response
  } catch (err) {
    console.log('cant hit', err);
  }
}

export const signin = async formBody => {
  try {
    let response = await axios.post('/users/signin', formBody)

    return response
  } catch (err) {
    console.log('cant hit', err)
  }
}
