import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { AppMenu } from './AppMenu';
import { AppContent } from './AppContent';
import { AppDrawer, drawerWidth } from './AppDrawer';
import { IConversation } from '../../conversations/types';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';
import { IncomingCallNotification } from '../../call/components/IncomingCallNotification';

const styles = (theme: Theme) =>
createStyles({
  content: {
    width: `100%`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
  },
});

interface AppLayoutProps {
  classes: any,
  showDrawer: boolean,
}

interface AppLayoutState {
  conversations: IConversation[];
}

class AppLayout extends React.Component<AppLayoutProps, AppLayoutState>{
  constructor(props: AppLayoutProps){
    super(props);
    this.state = {
      conversations: [],
    }
  }

  render() {
    const { classes, showDrawer } = this.props;
    const contentClasses = [classes.content, showDrawer && classes.contentShift].filter(Boolean).join(' ');    return (
      <div>
        <div className={contentClasses}>
          <AppMenu />
          <AppContent />
        </div>
        <AppDrawer />
        <IncomingCallNotification />
      </div>
    );
  }
}

const mapStateToProps = ({ layout } : IAppState ) => ({
  showDrawer: layout.showDrawer,
})

export default connect(mapStateToProps)(withStyles(styles)(AppLayout));
