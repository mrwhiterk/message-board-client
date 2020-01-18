import React, { Component } from 'react'

import { getSecret } from '../../axios-helpers'

export default class Home extends Component {
  render() {
    return (
      <div>
        Home
        <button onClick={getSecret}>submit</button>
      </div>
    )
  }
}
