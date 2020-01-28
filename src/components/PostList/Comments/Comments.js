import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Context from '../../Context/Context'
import { addComment, deleteComment } from '../../../axios-helpers'
import CreateComment from './CreateComment/CreateComment'
import CommentList from './CommentList/CommentList'

const styles = theme => ({
  cardHeader: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing()
  },
  smallAvatar: {
    width: 25,
    height: 25
  },
  commentField: {
    width: '96%'
  },
  commentText: {
    backgroundColor: 'white',
    padding: theme.spacing(),
    margin: `2px ${theme.spacing(2)}px 2px 2px`
  },
  commentDate: {
    display: 'block',
    color: 'gray',
    fontSize: '0.8em'
  },
  commentDelete: {
    fontSize: '1.6em',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  userLink: {
    textDecoration: 'none'
  }
})

class Comments extends Component {
  static contextType = Context

  addComment = async (e, formData) => {
    if (e.keyCode === 13) {
      try {
        let response = await addComment(this.props.postId, formData)
        this.props.updateComments(response.data)
      } catch (e) {
        console.log(e)
      }
    }
  }

  deleteComment = async (id, postId) => {
    try {
      let response = await deleteComment(id, postId)
      if (response.status === 200) {
        this.props.removeComment(postId)
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <>
        <CreateComment
          addComment={this.addComment}
          classes={this.props.classes}
        />
        <CommentList
          comments={this.props.comments}
          classes={this.props.classes}
          deleteComment={this.deleteComment}
          postId={this.props.postId}
        />
      </>
    )
  }
}
export default withStyles(styles)(Comments)
