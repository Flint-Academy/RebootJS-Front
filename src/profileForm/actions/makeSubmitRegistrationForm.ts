import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import history from '../../history';
import { createProfile } from '../../api/methods';
import { makeExitApp } from '../../layout/actions/makeExitApp';
import { makeInitApp } from '../../layout/actions/makeInitApp';


export const makeSubmitRegistrationForm = () => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    try {
      const { profileForm } = getState();
      const { email, lastname, firstname, password, confirmation } = profileForm.fields;
      if (
        email.isValid &&
        firstname.isValid &&
        lastname.isValid &&
        password.isValid &&
        confirmation.isValid
      ) {
        const profile = await createProfile(email.value, password.value, firstname.value, lastname.value)
        await dispatch(makeExitApp());
        dispatch(makeInitApp(profile));
        history.push(`/profile`);
      } else {
        throw Error("One of the fields is invalid");
      }
    } catch (error) {
      console.error('An error occured', error)
    }
  };
};
