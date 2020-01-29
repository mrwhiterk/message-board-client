import React, { Component } from 'react'
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import CommentIcon from '@material-ui/icons/Comment'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Comments from '../Comments/Comments'
import { notify } from 'react-notify-toast'
import Context from '../../Context/Context'
import { likePost } from '../../../axios-helpers'

const toastColor = {
  background: '#3f51b5',
  text: '#fff'
}

const errorToastColor = {
  background: '#f23535',
  text: '#fff'
}

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(0, 0, 0, 0.06)'
  },
  cardContent: {
    backgroundColor: 'white',
    padding: `${theme.spacing(2)}px 0px`
  },
  cardHeader: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing()
  },
  text: {
    margin: theme.spacing(2)
  },
  photo: {
    textAlign: 'center',
    backgroundColor: '#f2f5f4',
    padding: theme.spacing()
  },
  media: {
    height: 200
  },
  button: {
    margin: theme.spacing()
  }
})

class Post extends Component {
  static contextType = Context

  state = {
    like: false,
    likes: 0,
    comments: []
  }

  componentDidMount = async () => {
    this.toast = notify.createShowQueue()
    this.setState({ comments: this.props.comments })
  }

  deletePost = async () => {
    const { deletePost } = this.context

    try {
      let deletedPost = await deletePost(this.props._id)
      if (deletedPost.text) {
        this.toast(
          `Post: ${deletedPost.text} by ${deletedPost.postedBy.username} was deleted`,
          'custom',
          4000,
          toastColor
        )
      }
    } catch (error) {
      this.toast(`${error}`, 'custom', 4000, errorToastColor)
    }
  }

  checkLike = likes => {}

  like = async () => {
    try {
      let response = await likePost(this.props._id)

      if (response.status == 200) {
        this.context.updatePost(this.props._id, this.context.user._id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  updateComments = comment => {
    this.setState(prevState => ({ comments: [comment, ...prevState.comments] }))
  }

  removeComment = id => {
    this.setState({
      comments: [...this.state.comments].filter(item => {
        return item._id.toString() !== id.toString()
      })
    })
  }

  render() {
    const { classes } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar src={'https://www.fillmurray.com/200/200'} />}
          action={
            this.props.postedBy._id === this.context.user._id && (
              <IconButton onClick={this.deletePost}>
                <DeleteIcon />
              </IconButton>
            )
          }
          title={<Link to={''}>{this.props.postedBy.username}</Link>}
          subheader={this.props.created}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <Typography component="p" className={classes.text}>
            {this.props.text}
          </Typography>
          {this.props.photo && (
            <div className={classes.photo}>
              <img
                className={classes.media}
                src={this.props.photo}
                alt="something"
              />
            </div>
          )}
        </CardContent>
        <CardActions>
          {this.state.like ? (
            <IconButton
              onClick={this.like}
              className={classes.button}
              aria-label="Like"
              color="secondary"
            >
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={this.like}
              className={classes.button}
              aria-label="Unlike"
              color="secondary"
            >
              <FavoriteBorderIcon />
            </IconButton>
          )}{' '}
          <span>{this.props.likes.length}</span>
          <IconButton
            className={classes.button}
            aria-label="Comment"
            color="secondary"
          >
            <CommentIcon />
          </IconButton>{' '}
        </CardActions>
        <Divider />

        <Comments
          postId={this.props._id}
          comments={this.state.comments}
          updateComments={this.updateComments}
          removeComment={this.removeComment}
        />
      </Card>
    )
  }
}
export default withStyles(styles)(Post)
