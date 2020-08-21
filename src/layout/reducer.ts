import {
  ILayoutState,
  ILayoutAction,
  TOGGLE_DRAWER,
  UPDATE_DRAWER_CONTENT,
  LAYOUT_RESET,
} from './types';
import { toggleDrawerCase } from './cases/toggleDrawerCase';
import { defaultLayoutState } from './utils/defaultLayoutState';
import { updateDrawerContentCase } from './cases/updateDrawerContentCase';

export function layout(state: ILayoutState = defaultLayoutState(), action: ILayoutAction): ILayoutState {
  switch (action.type) {
    case LAYOUT_RESET:
      return defaultLayoutState();
    case TOGGLE_DRAWER:
      return toggleDrawerCase(state, action);
    case UPDATE_DRAWER_CONTENT:
      return updateDrawerContentCase(state, action)
    default:
      return state;
  }
}
