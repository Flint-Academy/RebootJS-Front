import { IFormField } from '../profileForm/types';

export type ILoginStatus = 'unavailable' | 'ready' | 'error';

export interface ILoginForm {
  email: IFormField<string>;
  password: IFormField<string>;
}

export interface ILoginState {
  status: ILoginStatus;
  form: ILoginForm;
}
