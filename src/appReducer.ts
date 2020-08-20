import { combineReducers } from 'redux';

import { identity } from './identity/reducer';
import { login } from './login/reducer';

export const appReducer = combineReducers({
  login,
  identity
})

export type IAppState = ReturnType<typeof appReducer>;