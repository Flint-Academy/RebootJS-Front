import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { ILoginForm, ILoginStatus } from '../types';
import { Alert } from '../../layout/Alert';
import { IFormField } from '../../profileForm/types';
import { login } from '../../api/methods';
import { history } from '../../history';

interface ILoginFormProps {
  email?: IFormField<string>;
  password?: IFormField<string>;
}

interface ILoginFormState {
  email: IFormField<string>;
  password: IFormField<string>;
  status: ILoginStatus;
}

class LoginForm extends React.Component<ILoginFormProps, ILoginFormState>{
  constructor(props: ILoginFormProps){
    super(props);
    this.state = {
      email: this.props.email || { value: '', isValid: true },
      password: this.props.password || { value: '', isValid: true},
      status: 'ready',
    }
  }


  update = <T extends keyof ILoginForm>(field: T, value: string): void => {
    this.setState({...this.state, [field]: { ...this.state[field], value: value }})
  }

  submit = (): void => {
    login(this.state.email.value, this.state.password.value)
      .then((_id) => history.push(`/profile`))
  }

  render(){
    const { status, email, password } = this.state;
    return (
      <Container maxWidth="xs">
        <Box style={{ margin: '2rem 0' }}>
          <Alert status={status} />
        </Box>
        <form onSubmit={(e) => { e.preventDefault(); this.submit()}}>
          <Box style={{ margin: '2rem 0' }}>
            <TextField
              label="Email"
              value={email.value}
              required={true}
              fullWidth={true}
              onChange={(event) => this.update('email', event.target.value)}
              {...(!email.isValid ? { error: true, helperText: email.error } : {})}
            />
            <TextField
              type="password"
              label="Password"
              value={password.value}
              required={true}
              fullWidth={true}
              onChange={(event) => this.update('password', event.target.value)}
              {...(!password.isValid ? { error: true, helperText: password.error } : {})}
            />
          </Box>
          <Box style={{ margin: '2rem 0' }}>
            <Grid container justify="flex-end">
              <Grid item xs={4}>
                <Button color="primary" variant="contained" fullWidth={true} type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    );
  }
}

export default LoginForm;
