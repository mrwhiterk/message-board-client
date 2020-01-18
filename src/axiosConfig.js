import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001/api'
})

instance.interceptors.response.use(response => {
  return response;
}, error => {
    return Promise.resolve({ error })
})

export default instance;