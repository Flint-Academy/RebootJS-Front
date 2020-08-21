import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { IProfileFormFields, IProfileFormStatus } from '../types';
import { IdentitySection } from './IdentitySection';
import { CredentialsSection } from './CredentialsSection';
import { Alert } from '../../layout/components/Alert';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { updateProfileForm } from '../actions/updateProfileForm';
import { makeSubmitRegistrationForm } from '../actions/makeSubmitRegistrationForm';

export interface IRegistrationFormProps {
  status: IProfileFormStatus;
  fields: IProfileFormFields;
  update<T extends keyof IProfileFormFields>(field: T, value: IProfileFormFields[T]['value']): void;
  saveProfile(): void;
}


class RegistrationForm extends React.Component<IRegistrationFormProps> {
  render() {
    const { update, saveProfile, fields, status } = this.props;
    const { email, firstname, lastname, password, confirmation } = fields;
    return (
      <Container>
        <Box style={{ margin: '2rem 0' }}>
          <Alert status={status} />
        </Box>
        <form onSubmit={(e) => { e.preventDefault(); saveProfile() }}>
          <Box style={{ margin: '2rem 0' }}>
            <Grid container justify="space-evenly" alignItems="flex-start">
              <Grid item xs={4}>
                <IdentitySection
                  allowEmailEdition={true}
                  email={email}
                  firstname={firstname}
                  lastname={lastname}
                  update={update}
                />
              </Grid>
              <Grid item xs={4}>
                <CredentialsSection password={password} confirmation={confirmation} update={update} />
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

const mapStateToProps = ({ profileForm }: IAppState) => ({
  status: profileForm.status,
  fields: profileForm.fields,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  update: <T extends keyof IProfileFormFields>(field: T, value: IProfileFormFields[T]['value']) =>
    dispatch(updateProfileForm(field, value)),
  saveProfile: () => dispatch(makeSubmitRegistrationForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);