import { combineReducers } from 'redux';

import { identity } from './identity/reducer';
import { login } from './login/reducer';
import { layout } from './layout/reducer';
import { profileForm } from './profileForm/reducer';
import { users } from './users/reducer';

export const appReducer = combineReducers({
  login,
  layout,
  profileForm,
  identity,
  users
})

export type IAppState = ReturnType<typeof appReducer>;