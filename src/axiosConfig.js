import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : '',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  }
})

export default instance;