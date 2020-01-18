import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core'

import ErrorIcon from '@material-ui/icons/Error'
import { red } from '@material-ui/core/colors'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { signin } from '../../../axios-helpers'
import { saveToLocalStorage } from '../../../helperFunctions'

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

class Signin extends Component {
  state = {
    username: '',
    password: '',
    open: false,
    error: ''
  }

  handleSubmit = async e => {
    e.preventDefault()

    let { username, password } = this.state

    let response = await signin({
      username,
      password
    })

    if (response.status === 200) {
      saveToLocalStorage(response.data.token)
      this.props.setAuth()
    } else {
      let message = response.data.message
      console.log(message);
      this.setState({ error: message })
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    const { classes  } = this.props

    let errMessage = (
      <Typography variant="body1" color="error">
        {this.state.error}
        <ErrorIcon style={{ color: red[500] }} className={classes.error} />
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
                Sign In
              </Typography>

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
      </div>
    )
  }
}

export default withStyles(styles)(Signin)
