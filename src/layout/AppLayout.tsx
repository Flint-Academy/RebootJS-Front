import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { AppMenu } from './AppMenu';
import { AppContent } from './AppContent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      width: `100%`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  }),
);

export function AppLayout() {
  const classes = useStyles();
  const contentClasses = [classes.content].filter(Boolean).join(' ');
  return (
    <div>
      <div className={contentClasses}>
        <AppMenu />
        <AppContent />
      </div>
    </div>
  );
}

export default AppLayout;
