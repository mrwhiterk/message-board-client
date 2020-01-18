import React from 'react';
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { indigo, pink } from '@material-ui/core/colors'
import MainRouter  from './containers/MainRouter'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757de8',
      main: '#3f51b5',
      dark: '#002984',
      contrast: '#fff'
    },
    secondary: {
      light: '#ff79b0',
      main: '#ff4081',
      dark: '#c60055',
      contrastText: '#000'
    }
  },
  openTitle: indigo['400'],
  protectedTitle: pink['400'],
  type: 'light'
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <MainRouter theme={theme} />
    </MuiThemeProvider>
  );
}

export default App;
