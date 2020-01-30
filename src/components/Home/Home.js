import React, { Component } from 'react'

import Context from '../Context/Context'

import { withStyles } from '@material-ui/core/styles'
import { Card, CardContent, CardMedia } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import SocialFeed from './SocialFeed/SocialFeed'
import FindPeople from './FindPeople/FindPeople'

const placeholder = 'https://www.fillmurray.com/640/360'

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5)
  },
  title: {
    padding: `${theme.spacing(3)} ${theme.spacing(2.5)} ${theme.spacing(2)}`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
})

class Home extends Component {
  static contextType = Context

  componentDidMount() {
    this.context.loadPosts()
  }

  render() {
    const { isAuthenticated } = this.context
    const { classes } = this.props
    return (
      <div>
        {isAuthenticated ? (
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
              <SocialFeed />
            </Grid>
            <Grid
              item
              xs={5}
              sm={5}
              style={{
                paddingTop: '30px',
                paddingLeft: '30px',
                paddingRight: '25px'
              }}
            >
              <FindPeople />
            </Grid>
          </Grid>
        ) : (
          <Card className={classes.card}>
            <Typography type="headline" variant="h2" className={classes.title}>
              Home Page
            </Typography>
            <CardMedia
              className={classes.media}
              image={placeholder}
              title="Billy Murray"
            />
            <CardContent>
              <Typography type="body1" variant="body1">
                Welcome to reddit before the real reddit
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Home)
