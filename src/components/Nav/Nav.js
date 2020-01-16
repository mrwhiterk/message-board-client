import React, { Component } from 'react'

import './Nav.css'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

import { NavLink, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  icon: {
    margin: theme.spacing(2.5),
    fontSize: 28
  }
})

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: '#ffa726'
    }
  } else {
    return {
      color: '#ffffff'
    }
  }
}

class Nav extends Component {
  render() {
    console.log(this.props.history)
    const { history, classes, theme } = this.props
    let activeHistoryStyleFunc;
    if (history.location.pathname === '/') {
      activeHistoryStyleFunc = isActive(history, '/')
    } else {
      activeHistoryStyleFunc = isActive(history, 'auth')
    }

    return (
      <AppBar position="static">
        <Toolbar type="title" color="inherit">
          <Typography>Reddit</Typography>
          <NavLink to="/">
            <IconButton aria-label="Home" className={classes.icon}>
              <HomeIcon style={activeHistoryStyleFunc} />
            </IconButton>
          </NavLink>
          <NavLink to="/signup" activeClassName="active-nav-link">
            Sign up
          </NavLink>
          <NavLink to="/signin" activeClassName="active-nav-link">
            Sign in
          </NavLink>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withRouter(withStyles(styles)(Nav))
