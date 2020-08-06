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
