import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {deepOrange, blue} from '@material-ui/core/colors';
import Routes from './routes/Routes';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: deepOrange,
  },
});

const App = () => {
    return (
        <>
            <MuiThemeProvider theme={theme}>
                <Routes/>
            </MuiThemeProvider>
        </>
        
    )
}

export default App;