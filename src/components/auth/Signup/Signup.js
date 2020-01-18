import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'

import ErrorIcon from '@material-ui/icons/Error'
import { red } from '@material-ui/core/colors'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Link } from 'react-router-dom'
import { signup } from '../../../axios-helpers'

import { passwordFieldsMatch } from '../../../helperFunctions'

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  link: {
    textDecoration: 'none'
  }
})

class Signup extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    open: false,
    error: ''
  }

  handleSubmit = async e => {
    e.preventDefault()

    let { username, password, email, confirmPassword } = this.state

    if (!passwordFieldsMatch(password, confirmPassword)) {
      return this.setState({ error: `password confirmation incorrect`})
    }

    let response = await signup({
      email,
      username,
      password,
      confirmPassword
    })
   
    if (response.status === 200) {
      console.log('ok');
      this.setState({ open: true })
    } else {
      let message = response.data.message
      this.setState({ error: message })
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props

    let errMessage = (
      <Typography variant="body1" color="error">
        {this.state.error}{' '}
        <ErrorIcon style={{ color: red[500] }} className={classes.error} />{' '}
      </Typography>
    )

    return (
      <div>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                type="headline"
                variant="h6"
                className={classes.title}
              >
                Sign Up
              </Typography>
              <TextValidator
                id="email"
                type="email"
                label="email"
                className={classes.textField}
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
                margin="normal"
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <TextValidator
                id="username"
                type="text"
                label="username"
                className={classes.textField}
                value={this.state.username}
                name="username"
                onChange={this.handleChange}
                margin="normal"
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <br />
              <TextValidator
                id="password"
                type="password"
                label="password"
                className={classes.textField}
                value={this.state.password}
                name="password"
                onChange={this.handleChange}
                margin="normal"
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <TextValidator
                id="confirmPassword"
                type="password"
                label="re-enter password"
                className={classes.textField}
                value={this.state.confirmPassword}
                name="confirmPassword"
                onChange={this.handleChange}
                margin="normal"
                validators={['required']}
                errorMessages={['this field is required']}
              />
              {this.state.error ? errMessage : null}
            </CardContent>
            <CardActions>
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                className={classes.submit}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        </ValidatorForm>

        <Dialog open={this.state.open} disableBackdropClick={true}>
          <DialogTitle>New Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              New Account successfully created
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/signin" className={classes.link}>
              <Button
                color="primary"
                autoFocus="autoFocus"
                variant="contained"
                className={classes.submit}
              >
                Sign in
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(Signup)
