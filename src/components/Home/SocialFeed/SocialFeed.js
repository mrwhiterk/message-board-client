import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import CreatePost from './CreatePost/CreatePost'
import PostList from './PostList/PostList'

const styles = theme => ({
  card: {
    margin: 'auto',
    paddingTop: 0,
    paddingBottom: theme.spacing(5)
  },
  title: {
    padding: `${theme.spacing(3)} ${theme.spacing(2.5)} ${theme.spacing(2)}`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  media: {
    minHeight: 330
  }
})

class SocialFeed extends Component {
  render() {
    const { classes } = this.props
    return (
      <Card className={classes.card}>
        {/* <Typography type="title" className={classes.title}>
          SocialFeed
        </Typography> */}
        <Divider />
        <CreatePost />
        <br />
        <Divider />
        <PostList />
      </Card>
    )
  }
}

export default withStyles(styles)(SocialFeed)
