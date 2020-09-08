import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { getConnectedProfile } from '../../api/methods';
import { makeInitApp } from '../../layout/actions/makeInitApp';
import { makeExitApp } from '../../layout/actions/makeExitApp';

export const makeFetchIdentity = () => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    try {
      const profile = await getConnectedProfile();
      dispatch(makeInitApp(profile));
    } catch (error) {
      dispatch(makeExitApp());
    }
  };
};
