import React, { useContext } from 'react'
import Context from '../../../Context/Context'
import Post from './Post/Post'
// import Spinner from '../../../UI/Spinner/Spinner'

const PostList = () => {
  const { posts } = useContext(Context)

  let postContent = 'Loading...'

  if (posts && posts.length === 0) {
    postContent = '-- No posts yet --'
  }

  if (posts && posts.length) {
    postContent = posts.map(props => {
      return <Post {...props} key={props._id} />
    })
  }

  return <div>{postContent}</div>
}

export default PostList
