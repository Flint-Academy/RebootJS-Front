import { IUpdateUsersListAction, UPDATE_USERS_LIST, IUserInfo } from '../types';

export function updateUsersList(info: IUserInfo[]): IUpdateUsersListAction {
  return {
    type: UPDATE_USERS_LIST,
    data: info,
  };
}
