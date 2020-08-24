import React, { Fragment } from 'react';
import { IConversationMessage } from '../types';
import { ListItemText, ListItemAvatar } from '@material-ui/core';
import { PrettyDate } from '../../layout/utils/PrettyDate';
import { IUserInfo } from '../../users/types';
import { UserAvatar } from '../../users/components/UserAvatar';
import { Username } from '../../users/components/Username';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';

export interface IChatMessageProps {
  message: IConversationMessage;
  emitter?: IUserInfo;
}

function ChatMessage({ message, emitter }: IChatMessageProps) {
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

const mapStateToProps = ({ users }:IAppState, { message }:IChatMessageProps) => ({
  emitter: users.list.find(user => user._id === message.emitter)
});

export default connect(mapStateToProps)(ChatMessage);