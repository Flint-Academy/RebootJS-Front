import { IIdentityState, IIdentityAction, UPDATE_IDENTITY } from './types';
import { updateIdentityCase } from '../identity/cases/updateIdentityCase';

export function identity(state: IIdentityState = {}, action: IIdentityAction): IIdentityState {
  switch (action.type) {
    case UPDATE_IDENTITY:
      return updateIdentityCase(state, action);
    default:
      return state;
  }
}
