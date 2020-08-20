import {
  ILoginState,
  ILoginAction,
  LOGIN_VALIDATE_FORM,
  LOGIN_RESET,
  LOGIN_UPDATE_FORM,
} from './types';
import { loginValidateFormCase } from './cases/loginValidateFormCase';
import { defaultLoginState } from './utils/defaultLoginState';
import { loginUpdateFormCase } from './cases/loginUpdateFormCase';

export function login(state: ILoginState = defaultLoginState(), action: ILoginAction): ILoginState {
  switch (action.type) {
    case LOGIN_RESET:
      return defaultLoginState();
    case LOGIN_UPDATE_FORM:
      return loginUpdateFormCase(state, action);
    case LOGIN_VALIDATE_FORM:
      return loginValidateFormCase(state, action);
    default:
      return state;
  }
}
