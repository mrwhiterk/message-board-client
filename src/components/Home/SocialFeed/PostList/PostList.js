import React, { useContext } from 'react'
import Context from '../../../Context/Context'
import Post from './Post/Post'

const PostList = props => {
  const context = useContext(Context)

  let postContent = 'Loading...'

  if (context.posts && context.posts.length === 0) {
    postContent = '-- No posts yet --'
  }

  if (context.posts && context.posts.length) {
    if (props.filterUser) {
      if (props.userId) {
        postContent = context.posts.map(postProps => {
          if (postProps.postedBy._id === props.userId) {
            return <Post {...postProps} key={postProps._id} />
          }
        })
      } else {
        postContent = context.posts.map(postProps => {
          if (postProps.postedBy._id === context.user._id) {
            return <Post {...postProps} key={postProps._id} />
          }
        })
      }
    } else {
      postContent = context.posts.map(props => {
        return <Post {...props} key={props._id} />
      })
    }
  }

  return <div>{postContent}</div>
}

export default PostList
