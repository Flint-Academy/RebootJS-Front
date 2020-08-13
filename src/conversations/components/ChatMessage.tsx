import React, { Fragment } from 'react';
import { IConversationMessage } from '../types';
import { ListItemText, ListItemAvatar } from '@material-ui/core';
import { PrettyDate } from '../../layout/utils/PrettyDate';
import { IUserInfo } from '../../users/types';
import { UserAvatar } from '../../users/components/UserAvatar';
import { Username } from '../../users/components/Username';

export interface IChatMessageProps {
  message: IConversationMessage;
  emitter?: IUserInfo;
}

export function ChatMessage({ message, emitter }: IChatMessageProps) {
  return (
    <Fragment>
      <ListItemAvatar>
        <UserAvatar info={emitter} />
      </ListItemAvatar>
      <ListItemText
        primary={message.content}
        secondary={
          <span>
            <Username info={emitter} />
            {' - '}
            <PrettyDate date={message.createdAt} />
          </span>
        }
      />
    </Fragment>
  );
}
