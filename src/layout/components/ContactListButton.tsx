import IconButton from '@material-ui/core/IconButton';
import Contacts from '@material-ui/icons/Contacts';
import React from 'react';

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


export default ContactListButton;