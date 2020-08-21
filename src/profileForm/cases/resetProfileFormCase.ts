import { IProfileFormState, IResetProfileFormContentAction } from '../types';
import { defaultProfileFormState } from '../utils/defaultProfileFormState';

export function resetProfileFormCase(
  _: IProfileFormState,
  { info }: IResetProfileFormContentAction,
): IProfileFormState {
  const newState = defaultProfileFormState();
  if (info) {
    const { email, firstname, lastname } = info;
    newState.fields.email.value = email;
    newState.fields.firstname.value = firstname;
    newState.fields.lastname.value = lastname;
    newState.optionalPassword = true;
  }
  newState.status = 'ready';
  return newState;
}
