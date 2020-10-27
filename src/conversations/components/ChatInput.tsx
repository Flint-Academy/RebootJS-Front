import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import React from 'react';
import { Fab } from '@material-ui/core';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { makeSendMessage } from '../actions/makeSendMessage';
import { StartCallButton } from '../../call/components/StartCallButton';

interface IChatInputProps {
  conversationId: string;
  targets: string[];
  sendMessage: (conversationId: string, message: string) => void;}

interface IChatInputState {
  messageEdition: string;
}

class ChatInput extends React.Component<IChatInputProps, IChatInputState>{
  constructor(props: IChatInputProps){
    super(props);
    this.state = {
      messageEdition: '',
    }
  }

  sendMessage = () => {
    const { conversationId, sendMessage } = this.props;
    sendMessage(conversationId, this.state.messageEdition)
    this.setState({
      messageEdition: ''
    });
  }

  updateMessageEdition = (newMessage: string) => {
    this.setState({messageEdition: newMessage});
  }

  render() {
    const messageEdition = this.state.messageEdition;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.sendMessage();
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <TextField
              fullWidth={true}
              value={messageEdition}
              variant="filled"
              onChange={(event) => this.updateMessageEdition(event.target.value)}
            />
          </div>
          <div
            style={{
              flexGrow: 0,
              display: 'flex',
              width: '150px',
              justifyContent: 'space-around',
            }}
          >
            <Fab type="submit" color="primary" aria-label="send">
              <Send fontSize="large" />
            </Fab>
            <StartCallButton conversationId={this.props.conversationId} />;
          </div>
        </div>
      </form>
    );
  }
}


const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  sendMessage: (conversationId: string, message: string) => void dispatch(makeSendMessage(conversationId, message)),
})

export default connect(undefined, mapDispatchToProps)(ChatInput);