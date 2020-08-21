import { IIdentityState, IIdentityAction, UPDATE_IDENTITY, IDENTITY_RESET } from './types';
import { updateIdentityCase } from '../identity/cases/updateIdentityCase';
import { defaultIdentityState } from './utils/defaultIdentityState';

export function identity(state: IIdentityState = defaultIdentityState(), action: IIdentityAction): IIdentityState {
  switch (action.type) {
    case IDENTITY_RESET:
      return defaultIdentityState();
    case UPDATE_IDENTITY:
      return updateIdentityCase(state, action);
    default:
      return state;
  }
}
