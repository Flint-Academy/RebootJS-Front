import Box from '@material-ui/core/Box';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginScreen from '../../login/components/LoginScreen';
import ContactList from '../../users/components/MyContacts';
import MyProfile from '../../profileForm/components/MyProfile';
import Chat from '../../conversations/components/Chat';
import { IUserInfo } from '../../users/types';

export interface IAppContentProps {
  users: IUserInfo[];
}

export function AppContent({ users }: IAppContentProps) {
  return (
    <Box style={{ height: '90vh' }}>
      <Switch>
        <Route path="/login" component={LoginScreen}/>
        <Route path="/contacts" component={ContactList} />
        <Route path="/profile" component={MyProfile} />
        <Route path="/conversation/:conversationId"><Chat status="ready" users={users}/></Route>
        <Route path="/" component={LoginScreen} />
      </Switch>
    </Box>
  );
}
