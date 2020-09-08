import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import history from '../../history';
import { deleteConnectedProfile } from '../../api/methods';


export const makeDeleteProfile = () => {
  return async (_dispatch: ThunkDispatch<IAppState, void, Action>, _getState: () => IAppState) => {
    try {
      await deleteConnectedProfile();
      history.push('/');
    } catch (error) {
      console.error('There has been an error');
    }
  };
};
