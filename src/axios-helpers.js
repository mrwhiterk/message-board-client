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

export const createPost = async postInfo => {
  try {
    let response = await axios.post('/posts', postInfo)

    return response
  } catch (err) {
    return err.response
  }
}

export const likePost = async postId => {
  try {
    let response = await axios.post(`/posts/like/${postId}`)

    return response
  } catch (err) {
    return err.response
  }
}

export const getPosts = async () => {
  try {
    let response = await axios.get('/posts')

    return response
  } catch (error) {
    return error.response
  }
}

export const getUsers = async () => {
  try {
    let response = await axios.get('/users')

    return response
  } catch (error) {
    return error.response
  }
}

export const followUser = async (leaderId, followId) => {
  let data = {
    leaderId,
    followId
  }
  try {
    let response = await axios.post('/users/followUser', data)

    return response
  } catch (error) {
    return error.response
  }
}

export const deletePost = async id => {
  try {
    let response = await axios.delete(`/posts/${id}`)
    return response
  } catch (error) {
    return error.response
  }
}

export const addComment = async (id, commentData) => {
  try {
    let response = await axios.post(`/posts/comments/${id}`, commentData)
    return response
  } catch (error) {
    return error.response
  }
}

export const deleteComment = async (postId, commentId) => {
  try {
    let response = await axios.delete(`/posts/comments/${postId}/${commentId}`)
    return response
  } catch (error) {
    return error.response
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
