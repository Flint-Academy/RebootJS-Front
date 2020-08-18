import ListItemText from '@material-ui/core/ListItemText';
import React, { Fragment } from 'react';
import { IUserInfo } from '../types';
import { Username } from './Username';
import { UserAvatar } from './UserAvatar';
import { ListItemAvatar } from '@material-ui/core';

export interface IContactListItemProps {
  info: IUserInfo;
}

export function ContactListItem({ info }: IContactListItemProps) {
  const { status } = info;
  return (
    <Fragment>
      <ListItemAvatar>
        <UserAvatar info={info} />
      </ListItemAvatar>
      <ListItemText primary={<Username info={info}/>} secondary={status} />
  </Fragment>
  );
}
