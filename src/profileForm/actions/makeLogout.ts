import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { logout } from '../../api/methods';
import history from '../../history';


export const makeLogout = () => {
  return async (_dispatch: ThunkDispatch<IAppState, void, Action>) => {
    try {
      await logout()
      history.push('/');
    } catch (error) {
      console.log('There has been an error');
    }
  };
};
