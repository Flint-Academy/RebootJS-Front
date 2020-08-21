import {
  IProfileFormState,
  IProfileFormAction,
  UPDATE_PROFILE_FORM,
  RESET_PROFILE_FORM_CONTENT,
} from './types';
import { updateProfileFormCase } from './cases/updateProfileFormCase';
import { resetProfileFormCase } from './cases/resetProfileFormCase';
import { defaultProfileFormState } from './utils/defaultProfileFormState';

export function profileForm(
  state: IProfileFormState = defaultProfileFormState(),
  action: IProfileFormAction,
): IProfileFormState {
  switch (action.type) {
    case UPDATE_PROFILE_FORM:
      return updateProfileFormCase(state, action);
    case RESET_PROFILE_FORM_CONTENT:
      return resetProfileFormCase(state, action);
    default:
      return state;
  }
}
