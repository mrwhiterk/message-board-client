import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import Context from '../Context/Context'
import { Redirect, Link } from 'react-router-dom'
import OtherUserFollowProfileButton from './OtherUserFollowProfileButton'
import OtherUserProfileTabs from './OtherUserProfileTabs'
import Spinner from '../UI/Spinner'
// import {
//   checkTokenAuth,
//   getUserProfileByID,
//   followUser,
//   unfollowUser
// } from '../lib/api'
import {} from '../../axios-helpers'
const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(2)}px ${theme.spacing(2)}px 0`,
    color: theme.palette.protectedTitle,
    fontSize: '1em'
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10
  }
})

class OtherUserProfile extends Component {
  static contextType = Context

  clickFollowButton = async () => {}

  clickUnfollowButton = async () => {}

  render() {
    const { classes } = this.props
    const photoUrl = this.props.user
      ? `/api/users/photo/${this.props.user._id}?${new Date().getTime()}`
      : '/api/users/defaultphoto'

    let isLoading = <Spinner />
    if (this.props.user) {
      isLoading = (
        <Paper className={classes.root} elevation={4}>
          <Typography type="title" className={classes.title}>
            User Profile
          </Typography>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={photoUrl} className={classes.bigAvatar} />
              </ListItemAvatar>
              <ListItemText
                primary={this.props.user.username}
                secondary={this.props.user.email}
              />
              <OtherUserFollowProfileButton
                variant="contained"
                otherUser={this.props.user}
                setUpdatedUser={this.props.setUpdatedUser}
                following={this.props.user.following}
                onButtonFollow={this.clickFollowButton}
                onButtonUnfollow={this.clickUnfollowButton}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText secondary={'Joined: ' + this.props.user.created} />
            </ListItem>
          </List>
          <OtherUserProfileTabs user={this.props.user} />
        </Paper>
      )
    }
    return <>{isLoading}</>
  }
}
export default withStyles(styles)(OtherUserProfile)
