import React from 'react';
import { IUserInfo } from '../types';
import { getUsers } from '../../api/methods';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { ContactListItem } from './ContactListItem';

export interface IContactListState {
  list: IUserInfo[];
}

class ContactList extends React.Component<{}, IContactListState> {
  constructor(props: {}) {
    super(props);
    this.state = {list: []}
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
            <ContactListItem info={user}/>
          ))}
        </List>
    );
  }

  componentDidMount(){
    getUsers().then((users) => this.setState({list: users}))
  }
}

export default ContactList;
