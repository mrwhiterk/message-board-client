import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Nav from '../components/Nav/Nav'
import Home from '../components/Home/Home'
import Signup from '../components/auth/Signup/Signup'
import Signin from '../components/auth/Signin/Signin'

import Context from '../components/Context/Context'

import { checkToken } from '../axios-helpers'

export default class MainRouter extends Component {
  static contextType = Context

  componentDidMount() {
    if (checkToken()) {
      this.context.setAuthenticated()
    }
  }

  render() {
    let routes = null
    if (!this.context.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Redirect to="/signin" />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <Nav theme={this.props.theme} />

        {routes}
      </div>
    )
  }
}
