import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { IUserInfo } from '../types';
import { Username } from './Username';

export interface IContactListItemProps {
  info: IUserInfo;
}

export function ContactListItem({ info }: IContactListItemProps) {
  const { status } = info;
  return (
      <ListItemText primary={<Username info={info}/>} secondary={status} />
  );
}
