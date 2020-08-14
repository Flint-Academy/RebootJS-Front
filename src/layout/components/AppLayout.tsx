import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { AppMenu } from './AppMenu';
import { AppContent } from './AppContent';
import { AppDrawer, drawerWidth } from './AppDrawer';
import { IDrawerContent } from '../types';
import { getUsers } from '../../api/methods';
import { IUserInfo } from '../../users/types';

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
  classes: any
}

interface AppLayoutState {
  showDrawer: boolean;
  drawerContent?: IDrawerContent;
  users: IUserInfo[];
}

class AppLayout extends React.Component<AppLayoutProps, AppLayoutState>{
  constructor(props: AppLayoutProps){
    super(props);
    this.state = {
      showDrawer: false,
      users: []
    }
  }


  componentDidMount(){
    getUsers()
      .then(users => { this.setState({ ...this.state, users: users }) });
  }

  changeDrawerContent = (newContent: IDrawerContent) => {
    this.setState({showDrawer: true, drawerContent: newContent})
  }

  hideDrawer = () => {
    this.setState({...this.state, showDrawer: false});
  }

  render() {
    const { classes } = this.props;
    const contentClasses = [classes.content, this.state.showDrawer && classes.contentShift].filter(Boolean).join(' ');    return (
      <div>
        <div className={contentClasses}>
          <AppMenu changeDrawerContent={this.changeDrawerContent} />
          <AppContent users={this.state.users} />
        </div>
        <AppDrawer users={this.state.users} show={this.state.showDrawer} hideDrawer={this.hideDrawer} content={this.state.drawerContent}/>
      </div>
    );
  }
}

export default withStyles(styles)(AppLayout);
