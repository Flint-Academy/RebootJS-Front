import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import React from 'react';
import { Dispatch, Action } from 'redux';
import { IDrawerContent } from '../types';
import ContactList from '../../users/components/MyContacts';
import ConversationList from '../../conversations/components/MyConversations';
import { IConversation } from '../../conversations/types';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';
import { hideDrawer } from '../actions/hideDrawer';

export interface IDrawerDisplayProps {
  show: boolean;
  content?: IDrawerContent;
  conversations: IConversation[];
  hideDrawer: () => void;
}

export const drawerWidth = 500;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerHeader: {
      heigth: '50px',
      textAlign: 'right',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    paper: {
      width: drawerWidth,
    },
    drawerContent: {
      height: 'calc(100% - 50px)',
    },
  }),
);

export function AppDrawerComponent({ show, content, conversations, hideDrawer }: IDrawerDisplayProps) {
  const { drawerHeader, paper, drawerContent } = useStyles();
  const contentDisplay =
    content === 'contacts' ? (
      <ContactList />
    ) : content === 'conversations' ? (
      <ConversationList conversations={conversations} status="ready" />
    ) : content === 'call' ? (
      <h1>Here will appear our call in progress</h1>
    ) : null;
  return (
    <Drawer variant="persistent" anchor="left" open={show} onClose={hideDrawer} classes={{ paper }}>
      <Box className={drawerHeader}>
        <IconButton aria-label="collapse" onClick={hideDrawer}>
          <ArrowBackIos />
        </IconButton>
      </Box>
      <Box className={drawerContent}>{contentDisplay}</Box>
    </Drawer>
  );
}

const mapStateToProps = ({ layout }: IAppState) => ({
  show: layout.showDrawer,
  content: layout.drawerContent,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  hideDrawer: () => dispatch(hideDrawer()),
})

export const AppDrawer = connect(mapStateToProps, mapDispatchToProps)(AppDrawerComponent);