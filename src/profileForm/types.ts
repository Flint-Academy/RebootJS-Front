import { IProfile } from '../identity/types';

export interface IFormField<T> {
  value: T;
  isValid: boolean;
  error?: string;
}

export interface IPasswordField extends IFormField<string> {
  hasLower: boolean;
  hasUpper: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  hasValidLength: boolean;
}

export type IProfileFormStatus = 'unavailable' | 'ready' | 'success' | 'error';

// FIXME support profile picture

export interface IProfileFormFields {
  email: IFormField<string>;
  firstname: IFormField<string>;
  lastname: IFormField<string>;
  password: IPasswordField;
  confirmation: IFormField<string>;
}

export interface IProfileFormState {
  status: IProfileFormStatus;
  optionalPassword?: boolean;
  fields: IProfileFormFields;
}

export const UPDATE_PROFILE_FORM = 'UPDATE_PROFILE_FORM';
export const RESET_PROFILE_FORM_CONTENT = 'RESET_PROFILE_FORM_CONTENT';

export interface IUpdateProfileFormAction<T extends keyof IProfileFormFields> {
  type: typeof UPDATE_PROFILE_FORM;
  field: T;
  value: IProfileFormFields[T]['value'];
}

export interface IResetProfileFormContentAction {
  type: typeof RESET_PROFILE_FORM_CONTENT;
  info?: IProfile;
}

export type IProfileFormAction =
  | IUpdateProfileFormAction<any>
  | IResetProfileFormContentAction;
