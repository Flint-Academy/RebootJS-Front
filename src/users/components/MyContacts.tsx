import React from 'react';
import { IUserInfo } from '../types';
import { getUsers } from '../../api/methods';

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
        <ul>
          { this.state.list.length ? null : (
            <li> No contact </li>
          )}
          {this.state.list.map((user) => (
            <li>
              Contact {user.firstname} {user.lastname}
            </li>
          ))}
        </ul>
    );
  }

  componentDidMount(){
    getUsers().then((users) => this.setState({list: users}))
  }
}

export default ContactList;
