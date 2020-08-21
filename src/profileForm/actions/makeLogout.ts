import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { logout } from '../../api/methods';
import { makeExitApp } from '../../layout/actions/makeExitApp';


export const makeLogout = () => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    try {
      await logout()
      dispatch(makeExitApp());
    } catch (error) {
      console.log('There has been an error');
    }
  };
};
