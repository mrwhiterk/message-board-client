import React, { Component } from 'react'
import Post from './Post/Post'
import Context from '../Context/Context'

class PostList extends Component {
  static contextType = Context

  render() {
    let { posts } = this.context

    let postContent = 'Loading...'

    if (posts && posts.length === 0) {
      postContent = '-- No posts yet --'
    }

    if (posts && posts.length) {
      postContent = posts.map((props, i) => <Post {...props} key={i} />)
    }

    return <div>{postContent}</div>
  }
}

export default PostList
