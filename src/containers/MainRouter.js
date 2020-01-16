import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Nav from '../components/Nav/Nav'
import Home from '../components/Home/Home'
import Signup from '../components/auth/Signup/Signup'
import Signin from '../components/auth/Signin/Signin'

export default class MainRouter extends Component {
  render() {
    return (
      <div>
        <Nav theme={this.props.theme} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
        </Switch>
      </div>
    )
  }
}
