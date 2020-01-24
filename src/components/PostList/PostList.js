import React, { Component } from 'react'
import Post from './Post/Post'

import { getPosts } from '../../axios-helpers'

class PostList extends Component {
  state = {
    posts: null,
    error: null
  }

  loadPosts = async () => {
    try {
      let response = await getPosts()

      if (response.status !== 200) {
        throw 'oops, something went wrong'
      }

      this.setState({ posts: response.data })
    } catch (error) {
      this.setState({ error: error })
    }
  }

  async componentDidMount() {
    this.loadPosts()
  }

  render() {
    let { posts } = this.state;
    let postContent = 'Loading...'

    if (posts && posts.length === 0) {
      postContent = '-- No posts yet--'
    } else {
      
    }

    if (posts && posts.length) {
      postContent = this.state.posts.map((props, i) => (
        <Post {...props} key={i} />
      ))
    }

    if (this.state.error) {
      postContent = this.state.error
    }

    return <div>{postContent}</div>
  }
}

export default PostList
