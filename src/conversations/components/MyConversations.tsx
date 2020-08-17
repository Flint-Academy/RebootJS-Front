import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { IConversation, IConversationsStatus } from '../types';
import { ConversationListItem } from './ConversationListItem';
import { Loading } from '../../layout/utils/Loading';
import { Link, withRouter } from 'react-router-dom';
import { getConversations, getConnectedProfile } from '../../api/methods';
import { IUserInfo } from '../../users/types';

export interface IConversationListProps {
  status: IConversationsStatus;
  users: IUserInfo[];
  classes: any;
  match: any;
  location: any;
  history: any;
}

export interface IConversationListState {
  list: IConversation[];
}

const styles = (theme: Theme) =>
  createStyles({
    selected: {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.light,
    },
  })

class ConversationList extends React.Component<IConversationListProps, IConversationListState> {
  // export function ConversationList({ status, list }: IConversationListProps) {
  constructor(props: IConversationListProps) {
    super(props)
    this.state = {
      list: []
    }
  }

  async componentDidMount() {
    const connectedProfile = await getConnectedProfile();
    const conversations = await getConversations(connectedProfile);
    this.setState({ ...this.state, list: conversations })
  }

  render() {
    const { list } = this.state;
    const loading = this.props.status === 'unavailable' ? <Loading /> : null;
    const { selected } = this.props.classes;
    const conversationId = this.props.match?.params.conversationId;
    return (
      <Box style={{ minWidth: '300px' }}>
        {loading}
        <List>
          {loading || list.length ? null : (
            <ListItem>
              <ListItemText primary="no conversation available..." />
            </ListItem>
          )}
          {list.map((conversation) => (
            <ListItem
              className={conversationId === conversation._id ? selected : undefined}
              button
              component={Link}
              to={`/conversation/${conversation._id}`}
              key={conversation._id}
            >
              <ConversationListItem conversation={conversation} users={this.props.users} />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }
}

export default withRouter(withStyles(styles)(ConversationList));
