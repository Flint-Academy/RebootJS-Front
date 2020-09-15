import { IProfile } from '../identity/types';

export type IUserInfo = Pick<IProfile, '_id' | 'lastname' | 'firstname' | 'status' | 'updatedAt'>;

export interface IUsersState {
  list: IUserInfo[];
}

export const USERS_RESET = 'USERS_RESET';
export const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

export interface IUsersResetAction {
  type: typeof USERS_RESET;
}

export interface IUpdateUserInfoAction {
  type: typeof UPDATE_USER_INFO,
  data: IUserInfo[]
}

export interface IUpdateUsersListAction {
  type: typeof UPDATE_USERS_LIST;
  data: IUserInfo[];
}

export type IUsersAction = IUpdateUserInfoAction | IUsersResetAction | IUpdateUsersListAction ;
