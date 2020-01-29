import React, { Component } from 'react'
import { CardHeader } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import Context from '../../../../../../Context/Context'
import { addComment } from '../../../../../../../axios-helpers'

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
  static contextType = Context

  state = {
    text: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  addComment = async (e, formData) => {
    if (e.keyCode === 13) {
      try {
        let response = await addComment(this.props.postId, formData)
        this.context.updateComments(response.data, this.props.postId)

        if (response.data) {
          this.setState({ text: '' })
        }
      } catch (e) {
        console.log(e)
      }
    }
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
