import React, { Component, useContext } from 'react'
import Context from '../Context/Context'
import { Route, Redirect } from 'react-router-dom'

import { checkToken } from '../../axios-helpers'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(Context)

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && checkToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  )
}

export default PrivateRoute
