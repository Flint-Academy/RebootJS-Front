import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import React from 'react';
import { Fab } from '@material-ui/core';
import { sendMessage } from '../../api/methods';

interface IChatInputProps {
  conversationId: string;
  targets: string[];
  updateMessages : () => void;
}

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
    sendMessage(this.props.conversationId, this.props.targets, this.state.messageEdition);
    this.setState({
      messageEdition: ''
    });
    this.props.updateMessages();
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
          </div>
        </div>
      </form>
    );
  }
}


export default ChatInput;