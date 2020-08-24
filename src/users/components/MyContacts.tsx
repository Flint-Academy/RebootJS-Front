import React from 'react';
import { IUserInfo } from '../types';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { ContactListItem } from './ContactListItem';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { makeCreateConversation } from '../../conversations/actions/makeCreateConversation';

export interface IContactListProps{
  list: IUserInfo[];
  createConversation: (targetId: string) => void;
}

class ContactList extends React.Component<IContactListProps> {
  render() {
    const { list, createConversation } = this.props
    return (
        <List>
          { list.length ? null : (
            <ListItem>
              <ListItemText primary="No contact"/>
            </ListItem>
          )}
          {list.map((user) => (
            <ListItem button onClick={() => createConversation(user._id)} key={user._id}>
              <ContactListItem info={user} />
            </ListItem>
          ))}
        </List>
    );
  }
}

const mapStateToProps = ({users}: IAppState) => ({
  list: users.list
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  createConversation: (targetId: string) => dispatch(makeCreateConversation(targetId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
