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
import DeleteUser from './DeleteUser'
import { Redirect, Link } from 'react-router-dom'
import FollowProfileButton from './FollowProfileButton'
import ProfileTabs from './ProfileTabs'
import Spinner from '../UI/Spinner'
import { getUserFollowerAndFollowing } from '../../axios-helpers'

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

class Profile extends Component {
  static contextType = Context

  state = {
    user: null
  }

  componentDidMount = async () => {
    this.context.loadPosts()

    try {
      let response = await getUserFollowerAndFollowing()
      let { following, followers } = response.data

      this.setState({
        user: {
          following,
          followers
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { classes } = this.props
    let photoUrl = 'https://www.fillmurray.com/200/200'
    let display = <Spinner />

    if (this.state.user) {
      display = (
        <Paper className={classes.root} elevation={4}>
          <Typography type="title" className={classes.title}>
            Profile
          </Typography>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={photoUrl} className={classes.bigAvatar} />
              </ListItemAvatar>
              <ListItemText
                primary={this.context.user.username}
                secondary={this.context.user.email}
              />
              <ListItemSecondaryAction>
                <Link to={'/user/edit/' + this.context.user.id}>
                  <IconButton aria-label="Edit" color="primary">
                    <EditIcon />
                  </IconButton>
                </Link>
                <DeleteUser />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                secondary={'Joined: ' + this.context.user.created}
              />
            </ListItem>
          </List>

          <ProfileTabs
            user={this.state.user}
            removePostUpdate={this.removePost}
          />
        </Paper>
      )
    }
    return <>{display}</>
  }
}
export default withStyles(styles)(Profile)
