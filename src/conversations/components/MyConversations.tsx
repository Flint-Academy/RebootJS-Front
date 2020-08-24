import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { IConversation, IConversationsStatus } from '../types';
import ConversationListItem from './ConversationListItem';
import { Loading } from '../../layout/utils/Loading';
import { Link, withRouter } from 'react-router-dom';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';

export interface IConversationListProps {
  status: IConversationsStatus;
  classes: any;
  match: any;
  location: any;
  history: any;
  conversations: IConversation[];
}

const styles = (theme: Theme) =>
  createStyles({
    selected: {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.light,
    },
  })

class ConversationList extends React.Component<IConversationListProps> {
  render() {
    const { conversations } = this.props;
    const loading = this.props.status === 'unavailable' ? <Loading /> : null;
    const { selected } = this.props.classes;
    const conversationId = this.props.match?.params.conversationId;
    return (
      <Box style={{ minWidth: '300px' }}>
        {loading}
        <List>
          {loading || conversations.length ? null : (
            <ListItem>
              <ListItemText primary="no conversation available..." />
            </ListItem>
          )}
          {conversations.map((conversation) => (
            <ListItem
              className={conversationId === conversation._id ? selected : undefined}
              button
              component={Link}
              to={`/conversation/${conversation._id}`}
              key={conversation._id}
            >
              <ConversationListItem conversation={conversation} />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }
}

const mapStateToProps = ({ conversations }: IAppState) => ({
  conversations: conversations.conversations
})
export default connect(mapStateToProps)(withRouter(withStyles(styles)(ConversationList)));
