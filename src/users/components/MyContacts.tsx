import React from 'react';
import { IUserInfo } from '../types';
import { getUsers, getConnectedProfile } from '../../api/methods';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { ContactListItem } from './ContactListItem';
import { IProfile } from '../../identity/types';
import history from '../../history';

export interface IContactListState {
  list: IUserInfo[];
}

class ContactList extends React.Component<{}, IContactListState> {
  constructor(props: {}) {
    super(props);
    this.state = {list: []}
  }

  createConversation = async (target: string) =>  {
    const connectedUser = await getConnectedProfile();
    const conversationId = forgeNewConversationId(connectedUser._id, target);
    return history.push(`/conversation/${conversationId}?target=${target}`);
  }

  render() {
    return (
        <List>
          { this.state.list.length ? null : (
            <ListItem>
              <ListItemText primary="No contact"/>
            </ListItem>
          )}
          {this.state.list.map((user) => (
            <ListItem button onClick={() => this.createConversation(user._id)} key={user._id}>
              <ContactListItem info={user} />
            </ListItem>
          ))}
        </List>
    );
  }

  async componentDidMount(){
    const users = await getUsers();
    this.setState({list: users});
  }
}

function forgeNewConversationId(user: IProfile, target: string){
  return Buffer.from([user._id, target, new Date().toISOString()].join('_')).toString('base64');
}

export default ContactList;
