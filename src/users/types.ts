import { IProfile } from '../identity/types';

export type IUserInfo = Pick<IProfile, '_id' | 'lastname' | 'firstname' | 'status' | 'updatedAt'>;