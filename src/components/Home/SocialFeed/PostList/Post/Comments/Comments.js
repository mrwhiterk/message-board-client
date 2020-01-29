import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Context from '../../../../../Context/Context'
import { addComment, deleteComment } from '../../../../../../axios-helpers'
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
        this.context.updateComments(response.data, this.props.postId)

        return response.data
      } catch (e) {
        return false
      }
    }
  }

  deleteComment = async id => {
    try {
      let response = await deleteComment(this.props.postId, id)
      if (response.status === 200) {
        this.context.removeComment(id, this.props.postId)
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <>
        <CreateComment
          classes={this.props.classes}
          addComment={this.addComment}
        />
        <CommentList
          classes={this.props.classes}
          comments={this.props.comments}
          deleteComment={this.deleteComment}
          postId={this.props.postId}
        />
      </>
    )
  }
}
export default withStyles(styles)(Comments)
