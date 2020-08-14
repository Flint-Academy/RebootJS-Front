import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Badge from '@material-ui/core/Badge';
import React, { Fragment } from 'react';
import { IConversation } from '../types';
import { PrettyDate } from '../../layout/utils/PrettyDate';
import { UserAvatar } from '../../users/components/UserAvatar';
import { IUserInfo } from '../../users/types';

export interface IConversationListItemProps {
  conversation: IConversation;
  users: IUserInfo[];
}

export function ConversationListItem({ conversation, users }: IConversationListItemProps) {
  const { unseenMessages, messages, targets, updatedAt } = conversation;
  const snippet = messages[messages.length - 1]?.content.substr(0, 25);
  return (
    <Fragment>
      <ListItemAvatar>
        <Badge badgeContent={unseenMessages} color="primary">
          <AvatarGroup max={3}>
            {targets.map((target) => (
              <UserAvatar key={target} info={users.find((user) => user._id === target)} />
            ))}
          </AvatarGroup>
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={snippet}
        secondary={
          <span>
            Last update
            {': '}
            <PrettyDate date={updatedAt} />
          </span>
        }
      />
    </Fragment>
  );
}
