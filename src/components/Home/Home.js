import React, { Component } from 'react'

import Context from '../Context/Context'

import { getSecret } from '../../axios-helpers'

export default class Home extends Component {

  static contextType = Context;

  componentDidUpdate() {
    console.log(this.context);
  }

  render() {
    return (
      <div>
        Home
        <button onClick={getSecret}>submit</button>
      </div>
    )
  }
}
