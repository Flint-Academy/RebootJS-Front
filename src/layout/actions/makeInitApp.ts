import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { IProfile } from '../../identity/types';
import { updateIdentity } from '../../identity/actions/updateIdentity';

export const makeInitApp = (profile: IProfile) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    dispatch(updateIdentity(profile));
  };
};
