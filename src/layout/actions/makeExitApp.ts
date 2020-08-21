import { Action } from 'redux';
import { batch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import history from '../../history';
import { layoutReset } from './layoutReset';
import { loginReset } from '../../login/actions/loginReset';
import { profileFormReset } from '../../profileForm/actions/profileReset';
import { identityReset } from '../../identity/actions/identityReset';
// import { usersReset } from '../../users/actions/usersReset';
// import { conversationsReset } from '../../conversations/actions/conversationsReset';

export const makeExitApp = () => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    batch(() => {
      // dispatch(conversationsReset());
      dispatch(identityReset());
      dispatch(layoutReset());
      dispatch(loginReset());
      dispatch(profileFormReset());
      // dispatch(usersReset());
    });
    history.push(`/login`);
  };
};
