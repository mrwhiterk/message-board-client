import React, { Component } from 'react'
import { CardHeader } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Context from '../../Context/Context'
import { addComment, deleteComment } from '../../../axios-helpers'
// import Comment from './Comment/Comment'

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

  state = { text: '' }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  addComment = async e => {
    if (e.keyCode === 13) {
      try {
        let response = await addComment(this.props.postId, this.state)

        this.props.updateComments(response.data)
        this.setState({ text: '' })
      } catch (e) {
        console.log(e)
      }
    }
  }

  deleteComment = async (id, postId) => {
    console.log(id)
    try {
      let data = await deleteComment(id, postId)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { classes } = this.props
    const { user } = this.context

    const commentBody = comment => {
      return (
        <p className={classes.commentText}>
          <Link to={''} className={classes.userLink}>
            {comment.postedBy.username}
          </Link>
          <br />
          {comment.text}
          <span className={classes.commentDate}>{comment.created}</span>
        </p>
      )
    }

    let comments = this.props.comments.map((item, i) => {
      return (
        <CardHeader
          avatar={
            <Avatar
              className={classes.smallAvatar}
              src={'https://www.fillmurray.com/200/200'}
            />
          }
          action={
            item.postedBy._id === user._id && (
              <IconButton
                onClick={() => this.deleteComment(this.props.postId, item._id)}
              >
                <DeleteIcon />
              </IconButton>
            )
          }
          title={commentBody(item)}
          name="item"
          className={classes.cardHeader}
          key={i}
        />
      )
    })

    return (
      <div>
        <CardHeader
          avatar={
            <Avatar
              className={classes.smallAvatar}
              src={'https://www.fillmurray.com/200/200'}
            />
          }
          title={
            <TextField
              onKeyDown={this.addComment}
              multiline
              value={this.state.text}
              name="text"
              onChange={this.handleChange}
              placeholder="Write something ..."
              className={classes.commentField}
              margin="normal"
            />
          }
          className={classes.cardHeader}
        />
        {comments}
      </div>
    )
  }
}
export default withStyles(styles)(Comments)
