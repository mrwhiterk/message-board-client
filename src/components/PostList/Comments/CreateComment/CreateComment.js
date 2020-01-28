import React, { Component } from 'react'
import { CardHeader } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
// import DeleteIcon from '@material-ui/icons/Delete'
// import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
// import { Link } from 'react-router-dom'
// import Context from '../../../Context/Context'

const styles = theme => ({
  cardHeader: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing()
  },
  smallAvatar: {
    width: 25,
    height: 25
  },
  commentField: {
    width: '96%'
  },
  commentText: {
    backgroundColor: 'white',
    padding: theme.spacing(),
    margin: `2px ${theme.spacing(2)}px 2px 2px`
  },
  commentDate: {
    display: 'block',
    color: 'gray',
    fontSize: '0.8em'
  },
  commentDelete: {
    fontSize: '1.6em',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  userLink: {
    textDecoration: 'none'
  }
})

class CreateComment extends Component {
  state = {
    text: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  addComment = (e, body) => {
    this.props.addComment(e, body)
    this.setState({ text: '' })
  }

  render() {
    let { classes } = this.props

    return (
      <CardHeader
        avatar={
          <Avatar
            className={classes.smallAvatar}
            src={'https://www.fillmurray.com/200/200'}
          />
        }
        title={
          <TextField
            onKeyDown={e => this.addComment(e, this.state)}
            multiline
            value={this.state.text}
            name="text"
            onChange={this.handleChange}
            placeholder="Write something ..."
            className={classes.commentField}
            margin="normal"
          />
        }
        className={classes.cardHeader}
      />
    )
  }
}

export default withStyles(styles)(CreateComment)
