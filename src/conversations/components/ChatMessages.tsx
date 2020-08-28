import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React, { Fragment, RefObject } from 'react';
import { IConversationMessage } from '../types';
import ChatMessage from './ChatMessage';

export interface IChatMessagesProps {
  conversationId?: string;
  messages: IConversationMessage[];
  conversationSeen: (id: string) => void;
}

class ChatMessages extends React.Component<IChatMessagesProps>{
  ref: RefObject<HTMLElement> = {current: null}

  componentDidMount(){
    if (this.props.conversationId) this.props.conversationSeen(this.props.conversationId);
    this.ref.current?.scrollIntoView(false);
  }

  componentDidUpdate(){
    if (this.props.conversationId) this.props.conversationSeen(this.props.conversationId);
    this.ref.current?.scrollIntoView(false);
  }

  render() {
    if (!this.props.messages.length) return <span>There is currently no message in the conversation...</span>;
    return (
      <Fragment>
        <List>
          {this.props.messages.map((message) => (
            <ListItem key={message._id}>
              <ChatMessage message={message}/>
            </ListItem>
          ))}
        </List>
        <span ref={this.ref} />
      </Fragment>
    );
  };
}

export default ChatMessages;