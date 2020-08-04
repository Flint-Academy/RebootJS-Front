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
  firstName: IFormField<string>;
  lastName: IFormField<string>;
  password: IPasswordField;
  confirmation: IFormField<string>;
}

export interface IProfileFormState {
  status: IProfileFormStatus;
  fields: IProfileFormFields;
}
