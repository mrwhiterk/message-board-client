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
import Spinner from '../../UI/Spinner'

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
    users: null,
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

  clickFollow = async leaderId => {
    try {
      let response = await followUser(leaderId)

      if (response.status === 200) {
        let { leader, follower } = response.data
        this.updateUserFollowers(leader, follower)
      }
    } catch (e) {
      console.log(e)
    }
  }

  updateUserFollowers = (leader, follower) => {
    this.setState({
      users: this.state.users.map(user => {
        if (user._id === leader._id) {
          user.followers.push(follower._id)
        }
        return user
      }),
      open: true
    })
  }

  handleRequestClose = (event, reason) => {
    this.setState({ open: false })
  }

  peopleToFollow = user => !user.followers.includes(this.context.user._id)

  render() {
    const { classes } = this.props

    let userList = <Spinner />

    if (this.state.users) {
      userList = this.state.users.reduce(
        (acc, user, i) =>
          this.peopleToFollow(user)
            ? acc.concat(
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
              )
            : acc,
        []
      )
    }

    if (userList.length === 0) {
      userList = <span>Your following everyone!</span>
    }

    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography type="title" className={classes.title}>
            Who to follow
          </Typography>
          <List>{userList}</List>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            open={this.state.open}
            onClose={this.handleRequestClose}
            autoHideDuration={6000}
            message={
              <span className={classes.snack}>
                {this.state.snackbarMessage}
              </span>
            }
          />
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(FindPeople)
