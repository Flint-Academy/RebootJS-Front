import { combineReducers } from 'redux';

import { identity } from './identity/reducer';
import { login } from './login/reducer';
import { layout } from './layout/reducer';

export const appReducer = combineReducers({
  login,
  layout,
  identity
})

export type IAppState = ReturnType<typeof appReducer>;