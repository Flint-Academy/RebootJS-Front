import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import React from 'react';
import { IDrawerContent } from '../types';
import ContactList from '../../users/components/MyContacts';

export interface IDrawerDisplayProps {
  show: boolean;
  content?: IDrawerContent;
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

export function AppDrawer({ show, content, hideDrawer }: IDrawerDisplayProps) {
  const { drawerHeader, paper, drawerContent } = useStyles();
  const contentDisplay =
    content === 'contacts' ? (
      <ContactList />
    ) : content === 'conversations' ? (
      <h1>Here will appear our conversations</h1>
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
