import { ILoginState } from '../types';
import { defaultStrField } from '../../utils/defaultFields';

export function defaultLoginState(): ILoginState {
  return {
    status: 'ready',
    form: {
      email: defaultStrField(),
      password: defaultStrField(),
    },
  };
}
