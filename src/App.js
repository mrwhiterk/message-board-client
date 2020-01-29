import React from 'react'
import './App.css'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { indigo, pink } from '@material-ui/core/colors'
import MainRouter from './containers/MainRouter'

import Context from './components/Context/Context'
import { removeToken } from './helperFunctions'
import { checkToken, getPosts, deletePost, createPost } from './axios-helpers'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757de8',
      main: '#3f51b5',
      dark: '#002984',
      contrast: '#fff'
    },
    secondary: {
      light: '#ff79b0',
      main: '#ff4081',
      dark: '#c60055',
      contrastText: '#000'
    }
  },
  openTitle: indigo['400'],
  protectedTitle: pink['400'],
  type: 'light'
})

class App extends React.Component {
  state = {
    isAuthenticated: false,
    user: null,
    posts: null
  }

  componentDidMount() {
    let user = checkToken()
    if (user) {
      this.setState({ user: user, isAuthenticated: true })
    }
  }

  setAuthenticated = data => {
    this.setState({
      isAuthenticated: true,
      user: data
    })
  }

  unAuthenticate = () => {
    this.setState({ isAuthenticated: false })
    removeToken()
  }

  loadPosts = async () => {
    try {
      let response = await getPosts()

      if (response.status !== 200) {
        throw new Error('oops, something went wrong')
      }

      this.setState({ posts: response.data })
    } catch (error) {
      console.log(error)
    }
  }

  createPost = async path => {
    let { data: post } = await createPost(path)
    this.setState({ posts: [post, ...this.state.posts] })
  }

  updatePostLikes = async (postId, userId) => {
    let postsCopy = [...this.state.posts]
    let postIndex = this.state.posts.findIndex(x => x._id === postId)
    let post = this.state.posts[postIndex]

    if (post.likes.includes(userId)) {
      postsCopy[postIndex].likes = post.likes.filter(item => item !== userId)
    } else {
      postsCopy[postIndex].likes = post.likes.concat(userId)
    }

    this.setState({
      posts: postsCopy
    })
  }

  deletePost = async id => {
    try {
      let response = await deletePost(id)

      this.setState({
        posts: response.data.posts
      })

      return response.data.deletedPost
    } catch (error) {
      console.log(error)
      return error
    }
  }

  render() {
    return (
      <Context.Provider
        value={{
          isAuthenticated: this.state.isAuthenticated,
          user: this.state.user,
          setAuthenticated: this.setAuthenticated,
          unAuthenticate: this.unAuthenticate,
          loadPosts: this.loadPosts,
          posts: this.state.posts,
          deletePost: this.deletePost,
          createPost: this.createPost,
          updatePostLikes: this.updatePostLikes
        }}
      >
        <MuiThemeProvider theme={theme}>
          <MainRouter theme={theme} />
        </MuiThemeProvider>
      </Context.Provider>
    )
  }
}

export default App
