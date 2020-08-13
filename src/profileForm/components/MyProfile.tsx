import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { IProfileFormFields, IProfileFormStatus } from '../types';
import { IdentitySection } from './IdentitySection';
import { CredentialsSection } from './CredentialsSection';
import { IIdentityStatus, IProfile } from '../../identity/types';
import { Alert } from '../../layout/components/Alert';
import { updateProfileForm, deleteProfile, saveUpdatedProfile } from '../utils/profileActions';
import { history } from '../../history';
import { getConnectedProfile, logout } from '../../api/methods';

export interface IProfileFormState {
  identityStatus: IIdentityStatus;
  formStatus: IProfileFormStatus;
  fields: IProfileFormFields;
  profile?: IProfile;
}


class MyProfile extends React.Component<{}, IProfileFormState>{
  constructor(props: {}) {
    super(props);
    this.state = {
      identityStatus: 'ready',
      formStatus: 'ready',
      fields: {
        email: { value: '', isValid: true },
        firstname: { value: '', isValid: true },
        lastname: { value: '', isValid: true },
        password: {
          value: '',
          isValid: true,
          hasLower: false,
          hasUpper: false,
          hasNumber: false,
          hasSymbol: false,
          hasValidLength: false
        },
        confirmation: { value: '', isValid: true },
      }
    }
  }

  componentDidMount() {
    getConnectedProfile()
      .then((user: IProfile) => {
        this.setState({ ...this.state, profile: user });
        this.resetProfile();
      });
  }

  update = <T extends keyof IProfileFormFields>(field: T, value: IProfileFormFields[T]['value']): void => {
    this.setState(updateProfileForm(this.state, field, value));
  };

  saveProfile = (): void => {
    if (this.state.profile) {
      saveUpdatedProfile(this.state.fields, this.state.profile)
        .then((user) => {
          this.setState({ ...this.state, profile: user })
          this.resetProfile();
        })
    }
  };

  resetProfile = (): void => {
    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        email: { value: this.state.profile?.email || '', isValid: true },
        firstname: { value: this.state.profile?.firstname || '', isValid: true },
        lastname: { value: this.state.profile?.lastname || '', isValid: true }
      }
    })
  };

  deleteProfile = (): void => {
    deleteProfile().then(() => history.push('/'));
  };

  logout = (): void => {
    logout().then(() => history.push('/'));
  }

  render() {
    const { identityStatus, formStatus, fields } = this.state
    const { email, firstname, lastname, password, confirmation } = fields;
    if ([identityStatus, formStatus].includes('unavailable')) return <h1>Unavailable, please wait</h1>;
    return (
      <Container>
        <Box style={{ margin: '2rem 0' }}>
          <Alert status={formStatus} success="Profile successfully updated!" />
        </Box>
        <Box style={{ margin: '2rem 0' }}>
          <Grid container justify="flex-end">
            <Grid item xs={2}>
              <Button variant="contained" color="secondary" fullWidth={true} onClick={this.logout}>
                Logout
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="secondary" fullWidth={true} onClick={this.deleteProfile}>
                Delete account
              </Button>
            </Grid>
          </Grid>
        </Box>
        <form onSubmit={(e) => { e.preventDefault(); this.saveProfile() }}>
          <Box style={{ margin: '2rem 0' }}>
            <Grid container justify="space-evenly" alignItems="flex-start">
              <Grid item xs={4}>
                <IdentitySection
                  allowEmailEdition={false}
                  email={email}
                  firstname={firstname}
                  lastname={lastname}
                  update={this.update}
                />
              </Grid>
              <Grid item xs={4}>
                <CredentialsSection password={password} confirmation={confirmation} update={this.update} />
              </Grid>
            </Grid>
          </Box>
          <Box style={{ margin: '2rem 0' }}>
            <Grid container justify="space-between">
              <Grid item xs={2}>
                <Button variant="contained" fullWidth={true} onClick={this.resetProfile}>
                  Reset
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" color="primary" fullWidth={true} type="submit">
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    );
  }
}

export default MyProfile
