import { IUsersState, IUsersAction, UPDATE_USERS_LIST, USERS_RESET, UPDATE_USER_INFO } from './types';
import { updateUsersListCase } from './cases/updateUsersListCase';
import { defaultUsersState } from './utils/defaultUsersState';
import { updateUserInfoCase } from './cases/updateUserInfoCase';

export function users(state: IUsersState = defaultUsersState(), action: IUsersAction): IUsersState {
  switch (action.type) {
    case USERS_RESET:
      return defaultUsersState();
    case UPDATE_USERS_LIST:
      return updateUsersListCase(state, action);
    case UPDATE_USER_INFO:
      return updateUserInfoCase(state, action);
    default:
      return state;
  }
}
