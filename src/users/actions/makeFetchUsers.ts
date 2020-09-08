import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { getUsers } from '../../api/api_methods';
import { updateUsersList } from './updateUsersList';

export const makeFetchUsers = () => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    try {
      const users = await getUsers();
      dispatch(updateUsersList(users));
    } catch (error) {
      console.error('An error occured', error);
    }
  };
};
