import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { AppMenu } from './AppMenu';
import { AppContent } from './AppContent';
import { AppDrawer, drawerWidth } from './AppDrawer';
import { getConnectedProfile, getConversations } from '../../api/methods';
import { IConversation } from '../../conversations/types';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';

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
  _polling?: NodeJS.Timeout;

  constructor(props: AppLayoutProps){
    super(props);
    this.state = {
      conversations: [],
    }
  }

  async componentDidMount(){
    this._polling = setInterval(async () => {
      const connectedProfile = await getConnectedProfile();
      const conversations = await getConversations(connectedProfile);
      this.setState({ ...this.state, conversations: conversations });
    }, 5000);
  }

  componentWillUnmount(){
    if(this._polling) clearTimeout(this._polling);
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
      </div>
    );
  }
}

const mapStateToProps = ({ layout } : IAppState ) => ({
  showDrawer: layout.showDrawer,
})

export default connect(mapStateToProps)(withStyles(styles)(AppLayout));
