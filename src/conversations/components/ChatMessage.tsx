import React, { Fragment } from 'react';
import { IConversationMessage } from '../types';
import { ListItemText, ListItemAvatar } from '@material-ui/core';
import { PrettyDate } from '../../layout/utils/PrettyDate';
import { ContactName } from '../../users/components/ContactName';
import { ContactAvatar } from '../../users/components/ContactAvatar';

export interface IChatMessageProps {
  message: IConversationMessage;
}

function ChatMessage({ message }: IChatMessageProps) {
  return (
    <Fragment>
      <ListItemAvatar>
        <ContactAvatar target={message.emitter} />
      </ListItemAvatar>
      <ListItemText
        primary={message.content}
        secondary={
          <span>
            <ContactName target={message.emitter} />
            {' - '}
            <PrettyDate date={message.createdAt} />
          </span>
        }
      />
    </Fragment>
  );
}

export default ChatMessage;