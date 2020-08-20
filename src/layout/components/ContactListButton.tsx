import IconButton from '@material-ui/core/IconButton';
import Contacts from '@material-ui/icons/Contacts';
import React from 'react';
import { connect } from 'react-redux';
import { makeShowUsers } from '../actions/makeShowUsers';

export interface IShowContactsButtonProps {
  showContactList: () => void;
}

export function ContactListButton({ showContactList }: IShowContactsButtonProps) {
  return (
    <IconButton aria-label="contacts" onClick={showContactList}>
      <Contacts fontSize="large" />
    </IconButton>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  showContactList: () => dispatch(makeShowUsers()),
})

export default connect(undefined, mapDispatchToProps)(ContactListButton);