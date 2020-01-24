import React, { Component } from 'react'
import Post from './Post/Post'

class PostList extends Component {
  render() {
    let { posts } = this.props

    let postContent = 'Loading...'

    if (posts && posts.length === 0) {
      postContent = '-- No posts yet--'
    }

    if (posts && posts.length) {
      postContent = posts.map((props, i) => <Post {...props} key={i} />)
    }

    return <div>{postContent}</div>
  }
}

export default PostList
