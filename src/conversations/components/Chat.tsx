import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { match as Match, Redirect } from 'react-router-dom';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { IConversation, IConversationsStatus } from '../types';
import { Alert } from '../../layout/components/Alert';
import { AttendeeList } from './AttendeeList';
import { getConversation } from '../../api/methods';
import { IUserInfo } from '../../users/types';
import { Loading } from '../../layout/utils/Loading';

export interface IChatProps {
  status: IConversationsStatus;
  match: Match<{ conversationId: string }>;
  users: IUserInfo[];
}

export interface IChatState {
  conversation?: IConversation;
}

class Chat extends React.Component<IChatProps, IChatState>{
  _isMounted: boolean = false;

  constructor(props: IChatProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._isMounted = true;

    if (this.props.match?.params.conversationId) {
      getConversation(this.props.match?.params.conversationId)
        .then(conversation => { if (this._isMounted) this.setState({ ...this.state, conversation: conversation }) })
    }
  }

  componentWillReceiveProps(){
    if (this.props.match?.params.conversationId) {
      getConversation(this.props.match?.params.conversationId)
        .then(conversation => { if (this._isMounted) this.setState({ ...this.state, conversation: conversation }) })
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { conversation } = this.state
    const conversationId = conversation ? conversation._id : this.props.match?.params.conversationId;
    if (!conversation) return <Loading />
    if (!conversationId) return <Redirect to="/profile" />;

    const { status, users } = this.props;
    const progress = status === 'sending' ? <LinearProgress /> : null;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 'calc(100% - 2rem)',
          padding: '1rem',
          boxSizing: 'border-box',
          justifyContent: 'strech',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: '1rem',
            boxSizing: 'border-box',
            flexGrow: 1,
          }}
        >
          <div style={{ flexGrow: 0, height: '40px' }}>
            <Alert status={status} />
            {progress}
          </div>
          <div style={{ flexGrow: 1, overflow: 'auto' }}>
            <ChatMessages
              conversationId={conversationId}
              messages={conversation.messages}
              users={users}
            />
          </div>
          <div style={{ flexGrow: 0, height: '60px' }}>
            <ChatInput conversationId={conversationId} targets={conversation.targets} />
          </div>
        </div>
        <div style={{ height: '100%', flexGrow: 0, width: '15%' }}>
          <AttendeeList targets={conversation.targets} users={users} />
        </div>
      </div>
    );
  }
}

export default Chat;