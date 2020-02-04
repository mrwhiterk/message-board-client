import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Context from '../Context/Context'
import OtherUserProfile from './OtherUserProfile'
import PostList from '../Home/SocialFeed/PostList/PostList'
import { getUserProfileById } from '../../axios-helpers'
import Spinner from '../UI/Spinner'

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5)
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
    ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
})
class OtherUserProfileHome extends Component {
  static contextType = Context

  state = {
    user: null
  }

  componentDidMount = async () => {
    this.context.loadPosts()
    let { id } = this.props.match.params
    try {
      let res = await getUserProfileById(id)

      this.setState({ user: res.data })
    } catch (error) {
      console.log(error)
    }
  }

  setUpdatedUser = async user => {
    this.setState({ user: user })
  }

  render() {
    let { user } = this.state

    let display = <Spinner />

    if (user) {
      display = (
        <Grid container>
          <Grid
            item
            xs={7}
            sm={7}
            style={{
              paddingTop: '30px',
              paddingLeft: '30px',
              paddingRight: '15px'
            }}
          >
            <OtherUserProfile
              user={this.state.user}
              setUpdatedUser={this.setUpdatedUser}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={5}
            style={{
              paddingTop: '30px',
              paddingLeft: '15px',
              paddingRight: '25px'
            }}
          >
            <PostList filterUser userId={this.state.user._id} />
          </Grid>
        </Grid>
      )
    }
    return display
  }
}
export default withStyles(styles)(OtherUserProfileHome)
