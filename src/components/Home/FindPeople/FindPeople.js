import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { getUsers, followUser } from '../../../axios-helpers'
import Context from '../../Context/Context'

const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: 0
  }),
  title: {
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  follow: {
    right: theme.spacing(2)
  },
  snack: {
    color: theme.palette.protectedTitle
  },
  viewButton: {
    verticalAlign: 'middle'
  }
})

class FindPeople extends Component {
  static contextType = Context

  state = {
    users: [],
    open: false
  }
  componentDidMount = async () => {
    try {
      let response = await getUsers()

      this.setState({ users: response.data })
    } catch (e) {
      console.log(e)
    }
  }

  clickFollow = async userId => {
    try {
      let response = await followUser(userId, this.context.user._id)

      if (response.status === 200) {
        let { leader, follower } = response.data

        let users = [...this.state.users]
        let leaderIndex = this.state.users.findIndex(x => x._id === leader._id)
        let followerIndex = this.state.users.findIndex(
          x => x._id === follower._id
        )
        users[leaderIndex].followers.push(follower._id)
        users[followerIndex].following.push(leader._id)
        this.setState({ users: users })
      }
    } catch (e) {
      console.log(e)
    }
  }

  handleRequestClose = (event, reason) => {
    this.setState({ open: false })
  }

  peopleToFollow = user => {
    return (
      this.context.user._id !== user._id &&
      !user.followers.includes(this.context.user._id)
    )
  }

  render() {
    const { classes } = this.props
    const userList = this.state.users.map((user, i) => {
      return this.peopleToFollow(user) ? (
        <span key={i}>
          <ListItem>
            <ListItemAvatar className={classes.avatar}>
              <Avatar src={'/api/users/photo/' + user._id} />
            </ListItemAvatar>
            <ListItemText primary={user.username} />
            <ListItemSecondaryAction className={classes.follow}>
              <Link to={'/user/' + user._id}>
                <IconButton
                  variant="raised"
                  color="secondary"
                  className={classes.viewButton}
                >
                  <VisibilityIcon />
                </IconButton>
              </Link>
              <Button
                aria-label="Follow"
                variant="contained"
                color="primary"
                onClick={() => this.clickFollow(user._id)}
              >
                Follow
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </span>
      ) : null
    })
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography type="title" className={classes.title}>
            Who to follow
          </Typography>
          <List>{userList}</List>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={this.state.open}
          onClose={this.handleRequestClose}
          autoHideDuration={6000}
          message={
            <span className={classes.snack}>{this.state.followMessage}</span>
          }
        />
      </div>
    )
  }
}
export default withStyles(styles)(FindPeople)
