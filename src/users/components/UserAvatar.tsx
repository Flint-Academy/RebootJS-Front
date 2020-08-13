import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import statusBadgeFactory from './statusBadgeFactory';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IUserInfo } from '../types';

const anchorOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    secondary: {
      color: theme.palette.getContrastText(theme.palette.secondary.dark),
      backgroundColor: theme.palette.secondary.dark,
    },
  }),
);

export interface IUserAvatarProps {
  info?: IUserInfo;
}

export function UserAvatar({ info }: IUserAvatarProps) {
  const { lastname, firstname, status } = info || { firstname: '?', lastname: '?', status: 'offline' };
  const initials = `${firstname[0]}${lastname[0]}`;
  const StatusBadge = statusBadgeFactory(status);
  const classes = useStyles();
  return (
    <StatusBadge variant="dot" overlap="circle" anchorOrigin={anchorOrigin}>
      <Avatar className={classes.secondary}>{initials}</Avatar>
    </StatusBadge>
  );
}
