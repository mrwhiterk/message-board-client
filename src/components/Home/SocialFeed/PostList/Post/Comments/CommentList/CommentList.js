import React, { Component } from 'react'
import { CardHeader } from '@material-ui/core'
// import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
// import { Link } from 'react-router-dom'
import Context from '../../../../../../Context/Context'
import Comment from './Comment/Comment'

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

class CommentList extends Component {
  static contextType = Context

  render() {
    let { classes, comments, deleteComment } = this.props
    let { user } = this.context

    let list = comments.map((item, i) => {
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
                onClick={() => deleteComment(this.props.postId, item._id)}
              >
                <DeleteIcon />
              </IconButton>
            )
          }
          title={<Comment comment={item} classes={this.props.classes} />}
          name="item"
          className={classes.cardHeader}
          key={i}
        />
      )
    })
    return <div>{list}</div>
  }
}

export default withStyles(styles)(CommentList)
