import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { match as Match, Redirect, withRouter } from 'react-router-dom';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { IConversation, IConversationsStatus } from '../types';
import { Alert } from '../../layout/components/Alert';
import AttendeeList from './AttendeeList';
import { Loading } from '../../layout/utils/Loading';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { makeConversationSeen } from '../actions/makeConversationSeen';

export interface IChatProps {
  status: IConversationsStatus;
  match: Match<{ conversationId: string }>;
  location: any;
  history: any;
  conversation?: IConversation;
  conversationSeen: (id: string) => void;
}

class Chat extends React.Component<IChatProps>{
  _isMounted: boolean = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { status, conversation, conversationSeen } = this.props;
    const conversationId = conversation ? conversation._id : this.props.match?.params.conversationId;
    if (!conversation) return <Loading />
    if (!conversationId) return <Redirect to="/profile" />;

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
              conversationSeen={conversationSeen}
            />
          </div>
          <div style={{ flexGrow: 0, height: '60px' }}>
            <ChatInput conversationId={conversationId} targets={conversation.targets}/>
          </div>
        </div>
        <div style={{ height: '100%', flexGrow: 0, width: '15%' }}>
          <AttendeeList targets={conversation.targets} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({conversations}: IAppState, {match}: IChatProps) => ({
  conversation: conversations.conversations.find(({ _id }) => {
    return _id === match.params?.conversationId;
  }),
})

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  conversationSeen: (id: string) => void dispatch(makeConversationSeen(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chat));
