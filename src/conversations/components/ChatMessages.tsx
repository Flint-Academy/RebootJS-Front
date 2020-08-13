import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React, { Fragment, RefObject } from 'react';
import { IConversationMessage } from '../types';
import { ChatMessage } from './ChatMessage';
import { IUserInfo } from '../../users/types';

export interface IChatMessagesProps {
  conversationId?: string;
  messages: IConversationMessage[];
  users: IUserInfo[];
}

class ChatMessages extends React.Component<IChatMessagesProps>{
  ref: RefObject<HTMLElement> = {current: null}

  conversationSeen = (id: string) => {
    console.log("conversation XX seen");
  }

  componentDidMount(){
    if (this.props.conversationId) this.conversationSeen(this.props.conversationId);
    this.ref.current?.scrollIntoView(false);
  }

  render() {
    if (!this.props.messages.length) return <span>There is currently no message in the conversation...</span>;
    return (
      <Fragment>
        <List>
          {this.props.messages.map((message) => (
            <ListItem key={message._id}>
              <ChatMessage message={message} emitter={this.props.users.find( user => user._id === message.emitter)}/>
            </ListItem>
          ))}
        </List>
        <span ref={this.ref} />
      </Fragment>
    );
  };
}

export default ChatMessages;