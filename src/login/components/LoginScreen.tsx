import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import LoginTabPanel from './LoginTabPanel';
import LoginForm from './LoginForm';
import RegistrationForm from '../../profileForm/components/RegistrationForm';

type ILoginScreenState = {
  tab: number;
}

class LoginScreen extends React.Component<{}, ILoginScreenState> {
  constructor(props: {}){
    super(props);
    this.state = { tab: 0 };
  }

  render() {
    return (
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Tabs
          value={this.state.tab}
          onChange={(_, newTab) => this.setState({ tab: newTab })}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <LoginTabPanel value={this.state.tab} index={0}>
          <LoginForm />
        </LoginTabPanel>
        <LoginTabPanel value={this.state.tab} index={1}>
          <RegistrationForm />
        </LoginTabPanel>
      </Container>
    );
  }
}

export default LoginScreen;
