import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Nav from '../components/Nav/Nav'
import Home from '../components/Home/Home'
import Signup from '../components/auth/Signup/Signup'
import Signin from '../components/auth/Signin/Signin'

import { removeToken } from '../helperFunctions'

import { checkToken } from '../axios-helpers'

export default class MainRouter extends Component {
  state = {
    isAuthenticated: false
  }

  setAuthenticated = () => {
    this.setState({ isAuthenticated: true })
  }

  unAuthenticate = () => {
    this.setState({ isAuthenticated: false })
    removeToken()
  }

  componentDidMount() {
    let hasValidToken = checkToken();
    if (hasValidToken) {
      this.setAuthenticated()
    }
  }

  render() {
    let routes = null
    if (!this.state.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/signup" render={() => <Signup />} />
          <Route
            path="/signin"
            render={() => (
              <Signin
                setAuth={this.setAuthenticated}
                isAuth={this.state.isAuthenticated}
              />
            )}
          />
          <Redirect to="/signin" />
        </Switch>
      )
    }

    if (this.state.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <Nav
          theme={this.props.theme}
          isAuth={this.state.isAuthenticated}
          unAuth={this.unAuthenticate}
        />

        {routes}
      </div>
    )
  }
}
