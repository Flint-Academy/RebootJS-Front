import Box from '@material-ui/core/Box';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginScreen from '../login/components/LoginScreen';
import ContactList from '../users/components/MyContacts';

export function AppContent() {
  return (
    <Box style={{ height: '90vh' }}>
      <Switch>
        <Route path="/login" component={LoginScreen}/>
        <Route path="/contacts" component={ContactList} />
        <Route path="/" component={LoginScreen} />
      </Switch>
    </Box>
  );
}
