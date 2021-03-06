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
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { makeResetProfileForm } from '../actions/makeResetProfileForm';
import { updateProfileForm } from '../actions/updateProfileForm';
import { makeLogout } from '../actions/makeLogout';
import { makeDeleteProfile } from '../actions/makeDeleteProfile';
import { makeSaveProfileForm } from '../actions/makeSaveProfileForm';

export interface IProfileFormProps {
  identityStatus: IIdentityStatus;
  formStatus: IProfileFormStatus;
  fields: IProfileFormFields;
  profile?: IProfile;
  update<T extends keyof IProfileFormFields>(field: T, value: IProfileFormFields[T]['value']): void;
  resetProfile(): void;
  logout(): void;
  deleteProfile(): void;
  saveProfile(): void;
}


class MyProfile extends React.Component<IProfileFormProps>{
  componentDidMount(){
    this.props.resetProfile();
  }

  render() {
    const { identityStatus, formStatus, fields, update, resetProfile, logout, deleteProfile, saveProfile } = this.props
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
              <Button variant="contained" color="secondary" fullWidth={true} onClick={logout}>
                Logout
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="secondary" fullWidth={true} onClick={deleteProfile}>
                Delete account
              </Button>
            </Grid>
          </Grid>
        </Box>
        <form onSubmit={(e) => { e.preventDefault(); saveProfile() }}>
          <Box style={{ margin: '2rem 0' }}>
            <Grid container justify="space-evenly" alignItems="flex-start">
              <Grid item xs={4}>
                <IdentitySection
                  allowEmailEdition={false}
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
            <Grid container justify="space-between">
              <Grid item xs={2}>
                <Button variant="contained" fullWidth={true} onClick={resetProfile}>
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

const mapStateToProps = ({ identity, profileForm }: IAppState) => ({
  identityStatus: identity.status,
  profile: identity.info,
  formStatus: profileForm.status,
  optionalPassword: profileForm.optionalPassword,
  fields: profileForm.fields,
});

const mapDispatchToProps = (dispatch: any) => ({
  update: <T extends keyof IProfileFormFields>(field: T, value: IProfileFormFields[T]['value']) =>
    dispatch(updateProfileForm(field, value)),
  resetProfile: () => dispatch(makeResetProfileForm()),
  logout: () => dispatch(makeLogout()),
  saveProfile: () => dispatch(makeSaveProfileForm()),
  deleteProfile: () => dispatch(makeDeleteProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
