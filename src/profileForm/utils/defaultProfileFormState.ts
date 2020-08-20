import { IProfileFormState } from "../types";
import { defaultStrField, defaultPasswordField } from "../../utils/defaultFields";

export function defaultProfileFormState(): IProfileFormState {
  return {
    status: 'ready',
    fields: {
      email: defaultStrField(),
      firstname: defaultStrField(),
      lastname: defaultStrField(),
      password: defaultPasswordField(),
      confirmation: defaultStrField(),
    }
  }
}