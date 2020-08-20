import { ILoginState, ILoginValidateFormAction } from '../types';
import { validateRequiredField } from '../utils/validateRequiredField';

export function loginValidateFormCase(state: ILoginState, action: ILoginValidateFormAction): ILoginState {
  const newState = {
    ...state,
    form: {
      email: { ...state.form.email },
      password: { ...state.form.password },
    },
  };
  validateRequiredField(newState.form.email);
  validateRequiredField(newState.form.password);
  return newState;
}
