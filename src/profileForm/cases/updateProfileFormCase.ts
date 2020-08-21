import { IProfileFormFields, IProfileFormState, IUpdateProfileFormAction } from '../types';
import { validateEmailField } from '../utils/validateEmailField';
import { validateNameField } from '../utils/validateNameField';
import { validatePasswordField } from '../utils/validatePasswordField';
import { validateConfirmationField } from '../utils/validateConfirmationField';

export function updateProfileFormCase<T extends keyof IProfileFormFields>(
  state: IProfileFormState,
  { field, value }: IUpdateProfileFormAction<T>,
): IProfileFormState {
  const newState = {
    ...state,
    fields: {
      ...state.fields,
      [field]: {
        ...state.fields[field],
        value,
      },
    },
  };
  if (field === 'email') {
    const { email } = newState.fields;
    validateEmailField(email);
  } else if (['firstname', 'lastname'].includes(field)) {
    const formField = newState.fields[field];
    validateNameField(formField);
  } else if (field === 'password') {
    const { password } = newState.fields;
    validatePasswordField(password, newState.optionalPassword);
  }
  if (['password', 'confirmation'].includes(field)) {
    const { password, confirmation } = newState.fields;
    validateConfirmationField(confirmation, password);
  }
  return newState;
}
