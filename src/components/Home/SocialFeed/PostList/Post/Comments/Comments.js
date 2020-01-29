import React from 'react'
import CreateComment from './CreateComment/CreateComment'
import CommentList from './CommentList/CommentList'

const Comments = props => {
  return (
    <>
      <CreateComment postId={props.postId} classes={props.classes} />
      <CommentList
        postId={props.postId}
        classes={props.classes}
        comments={props.comments}
      />
    </>
  )
}

export default Comments
