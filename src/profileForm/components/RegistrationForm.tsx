import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { IProfileFormFields, IProfileFormStatus } from '../types';
import { IdentitySection } from './IdentitySection';
import { CredentialsSection } from './CredentialsSection';
import { Alert } from '../../layout/components/Alert';
import history from '../../history';
import { updateProfileForm, createNewProfile } from '../utils/profileActions';

export interface IRegistrationDisplayFormState {
  status: IProfileFormStatus;
  fields: IProfileFormFields;
}

class RegistrationForm extends React.Component<{}, IRegistrationDisplayFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      status: 'ready',
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
  };

  update = <T extends keyof IProfileFormFields>(field: T, value: IProfileFormFields[T]['value']): void => {
    this.setState(updateProfileForm(this.state, field, value));
  }

  saveProfile = (): void => {
    createNewProfile(this.state.fields)
      .then(profile => history.push(`profile/${profile._id}`));
  }

  render() {
    const { email, firstname, lastname, password, confirmation } = this.state.fields;
    return (
      <Container>
        <Box style={{ margin: '2rem 0' }}>
          <Alert status={this.state.status} />
        </Box>
        <form onSubmit={(e) => { e.preventDefault(); this.saveProfile() }}>
          <Box style={{ margin: '2rem 0' }}>
            <Grid container justify="space-evenly" alignItems="flex-start">
              <Grid item xs={4}>
                <IdentitySection
                  allowEmailEdition={true}
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
            <Grid container justify="flex-end">
              <Grid item xs={2}>
                <Button variant="contained" color="primary" fullWidth={true} type="submit">
                  Register
              </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    );
  }
}

export default RegistrationForm