import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility'

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

class PeopleList extends Component {
  render() {
    let { classes } = this.props

    console.log(this.props)

    let userList = this.props.users.reduce(
      (acc, user, i) =>
        this.props.peopleToFollow(user)
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
                      onClick={() => this.props.clickFollow(user._id)}
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

    console.log(userList)

    return <div>{userList}</div>
  }
}

export default withStyles(styles, PeopleList)
