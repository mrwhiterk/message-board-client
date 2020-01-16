import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    console.log(this.props.history);
    return (
      <div>
        Home
      </div>
    )
  }
}
