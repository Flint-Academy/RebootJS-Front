import React from 'react';
import { IUserInfo } from '../types';
import { getConnectedProfile } from '../../api/methods';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { ContactListItem } from './ContactListItem';
import { IProfile } from '../../identity/types';
import history from '../../history';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';

export interface IContactListProps{
  list: IUserInfo[];
}

class ContactList extends React.Component<IContactListProps> {
  createConversation = async (target: string) =>  {
    const connectedUser = await getConnectedProfile();
    const conversationId = forgeNewConversationId(connectedUser._id, target);
    return history.push(`/conversation/${conversationId}?target=${target}`);
  }

  render() {
    const { list } = this.props
    return (
        <List>
          { list.length ? null : (
            <ListItem>
              <ListItemText primary="No contact"/>
            </ListItem>
          )}
          {list.map((user) => (
            <ListItem button onClick={() => this.createConversation(user._id)} key={user._id}>
              <ContactListItem info={user} />
            </ListItem>
          ))}
        </List>
    );
  }
}

function forgeNewConversationId(user: IProfile, target: string){
  return Buffer.from([user._id, target, new Date().toISOString()].join('_')).toString('base64');
}

const mapStateToProps = ({users}: IAppState) => ({
  list: users.list
})

export default connect(mapStateToProps)(ContactList);
