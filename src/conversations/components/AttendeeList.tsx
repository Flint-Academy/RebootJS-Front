import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import React from 'react';
import { UserAvatar } from '../../users/components/UserAvatar';
import { Username } from '../../users/components/Username';
import { IUserInfo } from '../../users/types';

export interface IAttendeeListProps {
  targets: string[];
  users: IUserInfo[];
}

export function AttendeeList({ targets, users }: IAttendeeListProps) {
  return (
    <List>
      {targets.map((target) => {
        const user = users.find((userInfo: IUserInfo) => userInfo._id === target);
        return (
          <ListItem key={target}>
            <ListItemAvatar>
              <UserAvatar info={user} />
            </ListItemAvatar>
            <ListItemText primary={<Username info={user} />} />
          </ListItem>
        )
      }
      )}
    </List>
  );
}
