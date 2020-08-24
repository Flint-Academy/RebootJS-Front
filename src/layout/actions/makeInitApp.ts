import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { IProfile } from '../../identity/types';
import { updateIdentity } from '../../identity/actions/updateIdentity';
import { makeFetchUsers } from '../../users/actions/makeFetchUsers';
import { makeFetchConversations } from '../../conversations/actions/makeFetchConversations';

export const makeInitApp = (profile: IProfile) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    dispatch(updateIdentity(profile));
    dispatch(makeFetchConversations());
    dispatch(makeFetchUsers());
  };
};
