export type IUserStatus = 'available' | 'incall' | 'offline';

export type IIdentityStatus = 'unavailable' | 'ready';

export interface IProfile {
  _id: string;
  email: string;
  lastname: string;
  firstname: string;
  status: IUserStatus;
  updatedAt: string;
  conversationsSeen?: { [conversationId: string]: string };
}

export interface IIdentityState {
  status: IIdentityStatus;
  info?: IProfile;
}

export const UPDATE_IDENTITY = 'UPDATE_IDENTITY';
export const IDENTITY_RESET = 'IDENTITY_RESET';

export interface IUpdateIdentityAction {
  type: typeof UPDATE_IDENTITY;
  info: Partial<IProfile>;
}

export interface IIdentityResetAction {
  type: typeof IDENTITY_RESET;
}

export type IIdentityAction =  IUpdateIdentityAction
  | IIdentityResetAction;