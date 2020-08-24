import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Forum from '@material-ui/icons/Forum';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';
import ContactListButton from './ContactListButton';
import MyConversationsButton from '../../conversations/components/MyConversationsButton';
import { ProfileButton } from './ProfileButton';
import NavBarName from '../../identity/components/NavBarName';

export function AppMenu(){
  return (
    <Fragment>
      <AppBar position="static" style={{ height: '10vh' }}>
        <Grid container justify="space-between" alignItems="center" style={{ height: '100%' }}>
          <Grid item>
            <Toolbar>
              <Forum fontSize="large" />
              <Typography variant="h3">flint.</Typography>
            </Toolbar>
          </Grid>
          <Grid item>
            <Toolbar>
              <NavBarName />
            </Toolbar>
          </Grid>
          <Grid item>
            <Toolbar>
              <MyConversationsButton />
              <ContactListButton />
              <ProfileButton />
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </Fragment>
  );
}


export default AppMenu;