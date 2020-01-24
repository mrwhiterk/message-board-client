import React, { Component } from 'react'
import { Card, CardActions, CardContent, CardHeader } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import ErrorIcon from '@material-ui/icons/Error'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import Notifications, { notify } from 'react-notify-toast'
import Context from '../../Context/Context'
import { createPost } from '../../../axios-helpers'

const errorToastColor = {
  background: '#f23535',
  text: '#fff'
}
const toastColor = {
  background: '#3f51b5',
  text: '#fff'
}
const styles = theme => ({
  root: {
    backgroundColor: '#efefef',
    padding: `${theme.spacing(3)}px 0px 1px`
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(65, 150, 136, 0.09)',
    boxShadow: 'none'
  },
  cardContent: {
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: 'none'
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '90%'
  },
  submit: {
    margin: theme.spacing(2)
  },
  filename: {
    verticalAlign: 'super'
  },
  imageName: {
    fontSize: 8,
    marginLeft: 5
  }
})
class NewPost extends Component {
  static contextType = Context

  state = {
    text: '',
    photoName: '',
    photo: null
  }

  componentDidMount = () => {
    this.toast = notify.createShowQueue()
    this.formData = new FormData()
  }

  handleSubmitPost = async event => {
    event.preventDefault()

    for (const key in this.state) {
      this.formData.set(key, this.state[key])
    }

    try {
      let request = await createPost(this.formData)
      
      this.setState({ text: '', photoName: '', photo: null })
      this.context.loadPosts()
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFileUpload = event => {
    let errs = []
    const files = event.target.files
    let file = files[0]

    //only one upload is allowed
    if (files.length > 1) {
      errs.push('only one file is allowed')
    }

    //second is check image types only allow jpeg jpg and png
    let filetypes = ['.jpg', '.jpeg', '.png']
    let ext = file.name.match(/\.\w+/).join('')

    if (!filetypes.includes(ext)) {
      errs.push('file type not supported')
    }

    // check file size 5mb
    if (file.size > 5000000) {
      errs.push('file must not exceed 5mb')
    }

    if (errs.length) {
      errs.forEach(err => this.toast(err, 'custom', 4000, errorToastColor))
    } else {
      this.toast('Successfully uploaded', 'custom', 4000, toastColor)
      this.setState({ photo: file, photoName: file.name })
      this.formData.set('photo', file)
    }
  }

  render() {
    console.log(this.state)
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Notifications options={{ zIndex: 200, top: '90px' }} />
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar src={''} />}
            title={this.context.user.username}
            className={classes.cardHeader}
          />
          <CardContent className={classes.cardContent}>
            <TextField
              placeholder="Share your thoughts ..."
              multiline
              rows="3"
              name="text"
              value={this.state.text}
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
            />
            <input
              accept="image/*"
              onChange={this.handleFileUpload}
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="secondary"
                className={classes.photoButton}
                component="span"
              >
                <PhotoCameraIcon />
                <span className={classes.photoName}>
                  {this.state.photoName ? this.state.photoName : <p>{' upload image'}</p>}
                </span>
              </IconButton>
            </label>{' '}
            <span className={classes.filename}></span>
            {this.state.error && (
              <Typography component="p" color="error">
                <ErrorIcon color="error" className={classes.error}>
                  error
                </ErrorIcon>
                {this.state.error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleSubmitPost}
              disabled={!this.state.text}
              className={classes.submit}
            >
              POST
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}
export default withStyles(styles)(NewPost)
