import React, { useContext } from 'react'
import Context from '../../../Context/Context'
import Post from './Post/Post'

const PostList = () => {
  const { posts } = useContext(Context)

  let postContent = 'Loading...'

  if (posts && posts.length === 0) {
    postContent = '-- No posts yet --'
  }

  if (posts && posts.length) {
    postContent = posts.map((props, i) => {
      return <Post {...props} key={i} />
    })
  }

  return <div>{postContent}</div>
}

export default PostList
