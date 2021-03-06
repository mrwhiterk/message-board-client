import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { checkToken } from '../axios-helpers'

import Nav from '../components/Nav/Nav'
// import Home from '../components/Home/Home'
// import Signup from '../components/auth/Signup/Signup'
// import Signin from '../components/auth/Signin/Signin'
// import Profile from '../components/Profile/Profile'
import Context from '../components/Context/Context'
import PrivateRoute from '../components/PrivateRoute/PrivateRoute'

const Home = React.lazy(() => import('../components/Home/Home'))
const Signup = React.lazy(() => import('../components/auth/Signup/Signup'))
const Signin = React.lazy(() => import('../components/auth/Signin/Signin'))
const Profile = React.lazy(() => import('../components/Profile/Profile'))
const OtherUserProfileHome = React.lazy(() =>
  import('../components/OtherUserProfile/OtherUserProfileHome')
)

export default class MainRouter extends Component {
  static contextType = Context

  componentDidMount() {
    checkToken()
  }

  render() {
    let { isAuthenticated: isAuth } = this.context

    let routes = (
      <Switch>
        {!isAuth && <Route path="/signup" component={Signup} />}
        {!isAuth && <Route path="/signin" component={Signin} />}
        <PrivateRoute path="/profile" component={Profile} redirect="/signup" />
        <Route exact path="/" component={Home} />
        <Route path="/user/:id" component={OtherUserProfileHome} />
        {/* <Redirect to={isAuth ? '/' : '/signin'} /> */}
      </Switch>
    )

    return (
      <div>
        <Nav theme={this.props.theme} />
        {routes}
      </div>
    )
  }
}
