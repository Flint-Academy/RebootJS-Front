import { IUsersState, IUsersAction, UPDATE_USERS_LIST, USERS_RESET } from './types';
import { updateUsersListCase } from './cases/updateUsersListCase';
import { defaultUsersState } from './utils/defaultUsersState';

export function users(state: IUsersState = defaultUsersState(), action: IUsersAction): IUsersState {
  switch (action.type) {
    case USERS_RESET:
      return defaultUsersState();
    case UPDATE_USERS_LIST:
      return updateUsersListCase(state, action);
    default:
      return state;
  }
}
