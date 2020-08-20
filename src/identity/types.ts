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

export const UPDATE_IDENTITY = 'UPDATE_IDENTITY';

export interface IUpdateIdentityAction {
  type: typeof UPDATE_IDENTITY;
  info: Partial<IProfile>;
}

export interface IIdentityState {
  info?: IProfile;
}

export type IIdentityAction =  IUpdateIdentityAction;