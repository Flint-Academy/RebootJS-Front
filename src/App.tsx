import React from 'react';
import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, blueGrey, red } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppLayout from './layout/components/AppLayout';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blueGrey,
    error: red,
  },
});

function App() {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <AppLayout/>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
