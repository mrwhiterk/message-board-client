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

import Context from '../Context/Context'

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
  static contextType = Context;

  render() {
    const { history, classes } = this.props
    let activeHistoryStyleFunc
    if (history.location.pathname === '/') {
      activeHistoryStyleFunc = isActive(history, '/')
    } else {
      activeHistoryStyleFunc = isActive(history, 'auth')
    }

    let routes = (
      <>
        <NavLink to="/">
          <IconButton aria-label="Home" className={classes.icon}>
            <HomeIcon style={activeHistoryStyleFunc} />
          </IconButton>
        </NavLink>
        <NavLink to="/signin" activeClassName="active-nav-link">
          <Button onClick={this.context.unAuthenticate}>Logout</Button>
        </NavLink>
      </>
    )

    if (!this.context.isAuthenticated) {
      routes = (
        <>
          <NavLink to="/signup" activeClassName="active-nav-link">
            <Button>Sign up</Button>
          </NavLink>
          <NavLink to="/signin" activeClassName="active-nav-link">
            <Button>Sign in</Button>
          </NavLink>
        </>
      )
    }

    return (
      <AppBar position="static">
        <Toolbar type="title" color="inherit">
          <Typography>Reddit</Typography>
          {routes}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withRouter(withStyles(styles)(Nav))
