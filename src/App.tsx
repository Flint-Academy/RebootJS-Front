import React from 'react';
import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, blueGrey, red } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppLayout from './AppLayout';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blueGrey,
    error: red,
  },
});

function App() {
  return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box>
            <AppLayout/>
          </Box>
        </ThemeProvider>
  );
}

export default App;
