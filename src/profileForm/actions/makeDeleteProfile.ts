import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import history from '../../history';
import { deleteProfile } from '../utils/profileActions';


export const makeDeleteProfile = () => {
  return async (_dispatch: ThunkDispatch<IAppState, void, Action>, _getState: () => IAppState) => {
    try {
      await deleteProfile();
      history.push('/');
    } catch (error) {
      console.log('There has been an error');
    }
  };
};
