import React, { useContext } from 'react'
import Context from '../../../Context/Context'
import Post from './Post/Post'
// import Spinner from '../../../UI/Spinner/Spinner'

const PostList = props => {
  const context = useContext(Context)
  console.log(context)

  let postContent = 'Loading...'

  if (context.posts && context.posts.length === 0) {
    postContent = '-- No posts yet --'
  }

  if (context.posts && context.posts.length) {
    console.log('inside 1')
    if (props.filterUser) {
      console.log('inside')
      postContent = context.posts.map(postProps => {
        if (postProps.postedBy._id === context.user._id) {
          return <Post {...postProps} key={postProps._id} />
        }
      })
    } else {
      postContent = context.posts.map(props => {
        return <Post {...props} key={props._id} />
      })
    }
  }

  return <div>{postContent}</div>
}

export default PostList
