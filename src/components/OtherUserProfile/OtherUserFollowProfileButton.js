import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Context from '../Context/Context'
import { followUser, unfollowUser } from '../../axios-helpers'

class OtherUserFollowProfileButton extends Component {
  static contextType = Context

  followClick = async () => {
    try {
      let res = await followUser(this.props.otherUser._id)
      let { leader, follower } = res.data

      this.props.setUpdatedUser(leader)
    } catch (e) {
      console.log(e)
    }
  }

  unfollowClick = async () => {
    try {
      let res = await unfollowUser(this.props.otherUser._id)
      let { leader, follower } = res.data
      console.log(res.data)
      this.props.setUpdatedUser(leader)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    let { otherUser } = this.props
    console.log(otherUser)

    let checkIfFollowed = otherUser.followers.find(
      x => x._id === this.context.user._id
    )

    return (
      <div>
        {checkIfFollowed ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={this.unfollowClick}
          >
            Unfollow
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={this.followClick}
          >
            Follow
          </Button>
        )}
      </div>
    )
  }
}
export default withRouter(OtherUserFollowProfileButton)
